import { Injectable } from '@angular/core';
import { GameData } from 'src/app/shared/models/GameData';
import { GameSave } from 'src/app/shared/models/GameSave';
import { Gamemode, Gamemodes } from 'src/app/shared/models/Gamemode';
import { ChessAI } from 'src/assets/chess/AI';
import { Game } from 'src/assets/chess/Game';
import { Move } from 'src/assets/chess/Move';
import { PieceColor, Position } from 'src/assets/chess/utility';
import { ChessMoveValidatorUtils } from './chess-move-validator.utils';

@Injectable()
export class GameHandlerService {
   private gameSaves: Record<Gamemode, GameSave> = this.createGameSavesRecord();
   private displayBoard: string[][] = Array(8).fill("empty").map(element => Array(8).fill(element));
   private announcement: string = "";
   private currentGamemode: Gamemode = "pvp";

   private webWorkerEnabled: boolean;
   private aiWorker?: Worker;

   constructor() {
      this.webWorkerEnabled = typeof Worker !== undefined;
      if(this.webWorkerEnabled) {
         try {
            this.aiWorker = new Worker(new URL('./ai.worker', import.meta.url));
            console.log("web worker working!!!")
         } catch(error) {
            console.error(error);
         }
      }
   }

   private get game(): Game {
      return this.gameSaves[this.currentGamemode].game;
   }

   public newGame(gamemode: Gamemode) {
      this.currentGamemode = gamemode;
      this.gameSaves[this.currentGamemode] = this.createNewGame(this.currentGamemode);
   }

   public init(gamemode: Gamemode): void {
      this.currentGamemode = gamemode;
      this.updateDisplayBoard();
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
         gamemode: this.currentGamemode,
         winner: this.game.getWinner(),
         turnNumber: this.game.turn + 1,
         humanPlayers: this.gameSaves[this.currentGamemode].humanPlayers
      };
   }

   public requestAIMove(delay: number, callback?: (move: Move) => void): void {
      this.announcement += ", thinking...";
      if(this.webWorkerEnabled && this.aiWorker) {
         this.aiWorker.postMessage(this.game);
         this.aiWorker.onmessage = (event: MessageEvent<Move>) => {
            const move = event.data;
            this.makeMove(move);
            if(callback) callback(move);
         }
      } else {
         setTimeout(() => {
            const move = ChessAI.getBestMove(this.game);
            this.makeMove(move);
            if(callback) callback(move);
         }, delay);
      }
   }

   public isHumanTurn(): boolean {
      return this.gameSaves[this.currentGamemode].humanPlayers.includes(this.game.current);
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
         humanPlayers: []
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

   private updateDisplayBoard(): void {
      for (let i = 0; i < 8; i++) {
         for (let j = 0; j < 8; j++) {
            this.displayBoard[i][j] = "empty";
         }
      }
      for (const piece of this.game.pieces) {
         this.displayBoard[piece.pos.y][piece.pos.x] = piece.getIcon();
      }
      this.announcement = this.game.current == "white" ? "White's turn" : "Black's turn";
      if (this.game.isInCheck(this.game.current)) {
         this.announcement += ", check";
      }
      if (this.game.ended) {
         if (this.game.getWinner() === "stalemate") {
            this.announcement = "Draw!";
         } else {
            this.announcement = this.game.getWinner() == PieceColor.BLACK ? "Black wins!" : "White wins!";
         }
      }
   }

   private createGameSavesRecord(): Record<Gamemode, GameSave> {
      const record = {} as Record<Gamemode, GameSave>;
      for(const mode of Gamemodes) {
         record[mode] = this.createNewGame(mode);
      }
      return record;
   }
}
