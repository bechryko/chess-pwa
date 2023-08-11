import { Component } from '@angular/core';
import { Game } from 'src/assets/chess/Game';
import { Move } from 'src/assets/chess/Move';
import { ChessAI } from 'src/assets/chess/AI';
import { PieceColor, Position } from 'src/assets/chess/utility';
import { Router } from '@angular/router';
import { Gamemode, LeaderboardElement } from 'src/app/services/model';
import { LocalDatabaseService } from 'src/app/services/local-database.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseSyncService } from 'src/app/services/database-sync.service';

@Component({
   selector: 'app-game',
   templateUrl: './game.component.html',
   styleUrls: ['./game.component.scss']
})
export class GameComponent {
   public game: Game;
   private selectedPosition: Position | null = null;
   public displayBoard: string[][];
   public announcement: string = "";
   public highlighted: Position[] = [];
   public pve: boolean = localStorage.getItem("chessPWA-gamemode") === 'pve';

   constructor(private router: Router, private dbService: LocalDatabaseService, private userService: UserService, private authService: AuthService, private syncService: DatabaseSyncService) {
      this.game = new Game();
      this.displayBoard = [];
      for (let i = 0; i < 8; i++) {
         this.displayBoard.push([]);
         for (let j = 0; j < 8; j++) {
            this.displayBoard[i].push("");
         }
      }
      this.updateDisplayBoard();
   }

   public onTileClick(event: { x: number, y: number }): void {
      const { x, y } = event;
      if (this.game.ended) {
         return;
      }
      if (!this.selectedPosition) {
         this.selectedPosition = { x, y };
      } else if (this.selectedPosition.x == x && this.selectedPosition.y == y) {
         this.selectedPosition = null;
      } else {
         for(const pos of this.highlighted) {
            if(pos.x == x && pos.y == y) {
               this.playerMove(new Move(this.selectedPosition, { x, y }));
               if(this.pve) {
                  setTimeout(() => {
                     this.selectedPosition = null;
                     this.aiMove();
                     this.updateDisplayBoard();
                  }, 0);
               }
               break;
            }
         }
         this.selectedPosition = { x, y };
      }
      this.updateDisplayBoard();
   }

   private playerMove(move: Move): boolean {
      this.selectedPosition = null;
      return this.game.makeMove(move);
   }

   private aiMove(): void {
      const move = ChessAI.getBestMove(this.game);
      //console.log(this.game.current)
      this.game.makeMove(move);
      //console.log(this.game.current)
      //console.log("AI moved", move);
   }

   public updateDisplayBoard(): void {
      for (let i = 0; i < 8; i++) {
         for (let j = 0; j < 8; j++) {
            this.displayBoard[i][j] = "empty";
         }
      }
      for (const piece of this.game.pieces) {
         this.displayBoard[piece.pos.y][piece.pos.x] = piece.getIcon();
      }
      this.syncSelections();
      this.announcement = this.game.current == "white" ? "White's turn" : "Black's turn";
      if (this.game.isCheck(this.game.current)) {
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

   private syncSelections(): void {
      if (!this.selectedPosition) return;
      this.highlighted = [this.selectedPosition];
      const piece = this.game.getPiece(this.selectedPosition);
      if (piece && piece.color == this.game.current) {
         this.highlighted.push(...this.game.getPossibleMoves(this.game.current)
            .filter((move: Move) => move.from.x === this.selectedPosition?.x && move.from.y === this.selectedPosition?.y)
            .map((move: { to: Position; }) => move.to));
      }
      console.log(this.highlighted)
   }

   public backToMenu() {
      this.router.navigateByUrl('/menu/gamemode-chooser');
   }

   public isGameWonVsAI(): boolean {
      return this.game.ended && this.game.getWinner() === PieceColor.WHITE && this.pve;
   }

   public onWin() {
      const leaderboardElement: LeaderboardElement = {
         gamemode: Gamemode.vsAI,
         name: JSON.parse(localStorage.getItem("chessPWA-user") ?? '"Unknown user"'),
         score: this.game.turn
      };
      this.dbService.addItem(leaderboardElement);
      if(navigator.onLine) {
         this.syncService.syncLeaderboardEntries();
      }
      this.router.navigateByUrl('/leaderboards');
   }
}
