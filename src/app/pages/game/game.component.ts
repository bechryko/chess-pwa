import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeaderboardElement } from 'src/app/shared/models/LeaderboardElements';
import { DatabaseSyncService } from 'src/app/shared/services/database-sync.service';
import { LocalDatabaseService } from 'src/app/shared/services/local-database.service';
import { Move } from 'src/assets/chess/Move';
import { PieceColor, Position } from 'src/assets/chess/utility';
import { GameHandlerService } from './game-handler.service';

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
      private gameHandlerService: GameHandlerService,
      private cdr: ChangeDetectorRef
   ) {
      this.gameData = this.gameHandlerService.getGameData();
   }

   ngOnInit() {
      this.gameHandlerService.init();
      this.syncGameData();
      if(!this.gameHandlerService.isHumanTurn()) {
         this.requestAIMove(0);
      }
   }

   public onTileClick(position: Position): void {
      const { x, y } = position;
      if (this.gameData.winner !== "none" || !this.gameHandlerService.isHumanTurn()) {
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
               this.requestAIMove(0);
            }
         } else {
            this.selectedPosition = { x, y };
            this.highlightPossibleMoves();
         }
      }
      this.syncGameData();
   }

   public backToMenu(): void {
      this.router.navigateByUrl('/menu/gamemode-chooser');
   }

   public isGameWonVsAI(): boolean {
      return this.gameData.gamemode === "pve" && this.gameData.winner === PieceColor.WHITE;
   }

   public onPvEWin(): void {
      const leaderboardElement: LeaderboardElement = {
         gamemode: "pve",
         name: JSON.parse(localStorage.getItem("chessPWA-user") ?? '"Unknown user"'),
         score: this.gameData.turnNumber
      };
      this.dbService.addItem(leaderboardElement);
      if(navigator.onLine) {
         this.syncService.syncLeaderboardEntries();
      }
      this.router.navigateByUrl('/leaderboards');
   }

   private requestAIMove(delay: number): void {
      this.gameHandlerService.requestAIMove(delay, (move: Move) => {
         this.syncGameData();
         this.highlightMove(move);
      });
   }

   private highlightPossibleMoves(): void {
      this.highlighted = this.selectedPosition ? 
         [this.selectedPosition, ...this.gameHandlerService.getPossibleMoves(this.selectedPosition)] : 
         [];
   }

   private highlightMove(move: Move): void {
      this.highlighted = [move.from, move.to];
      this.cdr.markForCheck();
   }

   private syncGameData(): void {
      this.gameData = this.gameHandlerService.getGameData();
      this.cdr.markForCheck();
   }
}
