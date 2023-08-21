import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeaderboardElement } from 'src/app/shared/models/LeaderboardElements';
import { DatabaseSyncService } from 'src/app/shared/services/database-sync.service';
import { GameHandlerService } from 'src/app/shared/services/game-handler.service';
import { LocalDatabaseService } from 'src/app/shared/services/local-database.service';
import { Move } from 'src/assets/chess/Move';
import { PieceColor, Position } from 'src/assets/chess/utility';

@Component({
   selector: 'app-game',
   templateUrl: './game.component.html',
   styleUrls: ['./game.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit {
   private selectedPosition: Position | null = null;
   public gameData;
   public highlighted: Position[] = [];

   constructor(
      private router: Router, 
      private dbService: LocalDatabaseService,
      private syncService: DatabaseSyncService,
      private gameHandlerService: GameHandlerService
   ) {
      this.gameData = this.gameHandlerService.getGameData();
   }

   ngOnInit() {
      this.gameHandlerService.init();
   }

   private syncGameData(): void {
      this.gameData = this.gameHandlerService.getGameData();
   }

   public onTileClick(position: Position): void {
      const { x, y } = position;
      if (this.gameData.winner !== "none") {
         return;
      }
      if (!this.selectedPosition) {
         this.selectedPosition = { x, y };
         this.highlightPossibleMoves();
      } else if (this.selectedPosition.x == x && this.selectedPosition.y == y) {
         this.selectedPosition = null;
         this.highlighted = [];
      } else {
         const playerMove = new Move(this.selectedPosition, { x, y });
         if(this.gameHandlerService.isMoveValid(playerMove)) {
            this.gameHandlerService.makeMove(playerMove);
            this.syncGameData();
            this.highlightMove(playerMove);
            if(this.gameData.gamemode === "pve" && this.gameData.winner === "none") {
               this.gameHandlerService.requestAIMove(0, (move: Move) => {
                  this.syncGameData();
                  this.highlightMove(move);
               });
            }
         } else {
            this.selectedPosition = { x, y };
            this.highlightPossibleMoves();
         }
      }
      this.syncGameData();
   }

   private highlightPossibleMoves(): void {
      this.highlighted = this.selectedPosition ? 
         [this.selectedPosition, ...this.gameHandlerService.getPossibleMoves(this.selectedPosition)] : 
         [];
   }

   private highlightMove(move: Move): void {
      this.highlighted = [move.from, move.to];
   }

   public backToMenu() {
      this.router.navigateByUrl('/menu/gamemode-chooser');
   }

   public isGameWonVsAI(): boolean {
      return this.gameData.gamemode === "pve" && this.gameData.winner === PieceColor.WHITE;
   }

   public onPvEWin() {
      const leaderboardElement: LeaderboardElement = {
         gamemode: "pve",
         name: JSON.parse(localStorage.getItem("chessPWA-user") ?? '"Unknown user"'),
         score: this.gameData.turnNumber + 1
      };
      this.dbService.addItem(leaderboardElement);
      if(navigator.onLine) {
         this.syncService.syncLeaderboardEntries();
      }
      this.router.navigateByUrl('/leaderboards');
   }
}
