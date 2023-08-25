import { Injectable } from '@angular/core';
import { Gamemode } from 'src/app/shared/models/Gamemode';
import { GamemodeService } from 'src/app/shared/services/gamemode.service';
import { ChessAI } from 'src/assets/chess/AI';
import { Game } from 'src/assets/chess/Game';
import { Move } from 'src/assets/chess/Move';
import { PieceColor, Position } from 'src/assets/chess/utility';
import { ChessMoveValidatorUtils } from './chess-move-validator.utils';

@Injectable()
export class GameHandlerService {
   private game = new Game();
   private displayBoard: string[][] = [];
   private announcement: string = "";
   private gamemode: Gamemode = "pvp";
   private humanPlayers: PieceColor[] = [PieceColor.BLACK, PieceColor.WHITE];
   private initialized = false;

   constructor(
      private gamemodeService: GamemodeService
   ) {
      this.newGame();
   }

   public newGame() {
      this.game = new Game();
      this.displayBoard = [];
      this.announcement = "";
      for (let i = 0; i < 8; i++) {
         this.displayBoard.push([]);
         for (let j = 0; j < 8; j++) {
            this.displayBoard[i].push("");
         }
      }
      this.updateDisplayBoard();
   }

   public init(): void {
      this.gamemode = this.gamemodeService.lastGamemode();
      if(this.initialized) {
         return;
      }
      switch(this.gamemode) {
         case 'pvp':
            this.humanPlayers = [ PieceColor.BLACK, PieceColor.WHITE ];
            break;
         case 'pve':
            this.humanPlayers = [ Math.random() < .5 ? PieceColor.BLACK : PieceColor.WHITE ];
            break;
      }
      this.initialized = true;
   }

   public makeMove(move: Move): boolean {
      const success = this.game.makeMove(move);
      if(success) {
         this.updateDisplayBoard();
      }
      return success;
   }

   public getGameData() {
      return {
         displayBoard: this.displayBoard,
         announcement: this.announcement,
         gamemode: this.gamemode,
         winner: this.game.getWinner(),
         turnNumber: this.game.turn + 1,
         humanPlayers: this.humanPlayers as PieceColor[]
      };
   }

   public requestAIMove(delay: number, callback?: (move: Move) => void): void {
      this.announcement += ", thinking...";
      setTimeout(() => {
         const move = ChessAI.getBestMove(this.game);
         this.makeMove(move);
         if(callback) callback(move);
      }, delay);
   }

   public isHumanTurn(): boolean {
      return this.humanPlayers.includes(this.game.current);
   }

   public isMoveValid(move: Move): boolean {
      return ChessMoveValidatorUtils.isMoveValid(this.game, move);
   }

   public getPossibleMoves(pos: Position): Position[] {
      return ChessMoveValidatorUtils.getPossibleMoves(this.game, pos);
   }
   
   private updateDisplayBoard(): GameHandlerService {
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
      return this;
   }
}
