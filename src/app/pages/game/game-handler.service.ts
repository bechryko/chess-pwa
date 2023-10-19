import { Injectable } from '@angular/core';
import { ChessAI, Game, Move, PieceColor, Position } from '@chess-core';
import { GameData, GameSave, Gamemode } from '@chess-models';
import { TranslocoService } from '@ngneat/transloco';
import { Store } from '@ngrx/store';
import { first } from 'rxjs';
import { gameActions } from 'src/app/pages/game/store/actions/game.actions';
import { selectSaveByMode } from 'src/app/pages/game/store/selectors/game.selectors';
import { ChessMoveValidatorUtils } from './chess-move-validator.utils';

@Injectable()
export class GameHandlerService {
   private currentSave: GameSave = this.createNewGame("pvp");
   private displayBoard: string[][] = Array(8).fill("empty").map(element => Array(8).fill(element));
   private announcement: string = "";

   constructor(
      private store: Store,
      private transloco: TranslocoService
   ) { }

   private get game(): Game {
      return this.currentSave.game;
   }

   public init(gamemode: Gamemode): void {
      this.store.select(selectSaveByMode[gamemode]).pipe(
         first()
      ).subscribe({
         next: save => this.currentSave = save ? {
            game: save.game.copy(),
            humanPlayers: [...save.humanPlayers],
            mode: save.mode
         } : this.createNewGame(gamemode),
         complete: () => this.updateDisplayBoard()
      });
   }

   public makeMove(move: Move): boolean {
      const success = this.game.makeMove(move);
      if (success) {
         this.updateDisplayBoard();
      }
      return success;
   }

   public getGameData(): GameData {
      return {
         displayBoard: this.displayBoard,
         announcement: this.announcement,
         gamemode: this.currentSave.mode,
         winner: this.game.getWinner(),
         turnNumber: this.game.turn + 1,
         humanPlayers: this.currentSave.humanPlayers
      };
   }

   public requestAIMove(delay: number, callback?: (move: Move) => void): void {
      this.announcement += this.translateInstant("thinkingAnnouncementSuffix");
      setTimeout(() => {
         const move = ChessAI.getBestMove(this.game);
         this.makeMove(move);
         if (callback) callback(move);
      }, delay);
   }

   public isHumanTurn(): boolean {
      return this.currentSave.humanPlayers.includes(this.game.current);
   }

   public isMoveValid(move: Move): boolean {
      return ChessMoveValidatorUtils.isMoveValid(this.game, move);
   }

   public getPossibleMoves(pos: Position): Position[] {
      return ChessMoveValidatorUtils.getPossibleMoves(this.game, pos);
   }

   private createNewGame(gamemode: Gamemode): GameSave {
      const save: GameSave = {
         game: new Game(),
         humanPlayers: [],
         mode: gamemode
      };
      switch (gamemode) {
         case 'pvp':
            save.humanPlayers = [PieceColor.BLACK, PieceColor.WHITE];
            break;
         case 'pve':
            save.humanPlayers = [Math.random() < .5 ? PieceColor.BLACK : PieceColor.WHITE];
            break;
      }
      return save;
   }

   public saveGame(): void {
      this.store.dispatch(gameActions.updateSave({ save: this.currentSave }));
   }

   private updateDisplayBoard(): void {
      for (let i = 0; i < 8; i++) {
         for (let j = 0; j < 8; j++) {
            this.displayBoard[i][j] = "empty";
         }
      }
      for (const piece of this.game.pieces) {
         this.displayBoard[piece.pos.y][piece.pos.x] = piece.getIcon();
      }
      this.announcement = this.translateInstant("turnAnnouncement", {
         color: this.translateInstant(`colors.${this.game.current}`)
      });
      if (this.game.isInCheck(this.game.current)) {
         this.announcement += this.translateInstant("checkAnnouncementSuffix");
      }
      if (this.game.ended) {
         if (this.game.getWinner() === "stalemate") {
            this.announcement = this.translateInstant("drawAnnouncement");
         } else {
            this.announcement = this.translateInstant("winAnnouncement", {
               color: this.translateInstant(`colors.${this.game.getWinner()}`)
            });
         }
         this.store.dispatch(gameActions.endGame({ mode: this.currentSave.mode }));
      }
   }

   private translateInstant(key: string | string[], interpolateParams?: Object | undefined): string {
      return this.transloco.translate("game." + key, interpolateParams);
   }
}
