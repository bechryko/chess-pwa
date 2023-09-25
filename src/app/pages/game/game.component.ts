import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RouteUrls } from 'src/app/shared/enums/routes';
import { GameData } from 'src/app/shared/models/GameData';
import { Gamemodes } from 'src/app/shared/models/Gamemode';
import { LeaderboardElement } from 'src/app/shared/models/LeaderboardElements';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DatabaseSyncService } from 'src/app/shared/services/database-sync.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import { LocalDatabaseService } from 'src/app/shared/services/local-database.service';
import { BuiltInUsernamesUtils } from 'src/app/shared/utils/built-in-usernames.utils';
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
   public gameData: GameData;
   public highlighted: Position[] = [];
   public isInitialized = false;
   private movesMade = false;

   public username$: Observable<string>;

   constructor(
      private router: Router,
      private dbService: LocalDatabaseService,
      private syncService: DatabaseSyncService,
      private gameHandlerService: GameHandlerService,
      private cdr: ChangeDetectorRef,
      private activatedRoute: ActivatedRoute,
      private authService: AuthService,
      private errService: ErrorService
   ) {
      this.gameData = this.gameHandlerService.getGameData();
      this.username$ = this.authService.username$;
   }

   ngOnInit() {
      if(!this.initialize()) {
         this.router.navigateByUrl(RouteUrls.GAMEMODE_CHOOSER);
      }
      this.syncGameData();
      if(!this.gameHandlerService.isHumanTurn()) {
         this.requestAIMove(0);
         this.movesMade = true;
      }
   }

   canDeactivate(): boolean {
      return !this.movesMade || this.gameData.winner !== 'none';
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
            this.movesMade = true;
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
      if(this.gameData.winner !== "none") {
         this.gameHandlerService.newGame(this.gameData.gamemode);
      }
      this.router.navigateByUrl(RouteUrls.GAMEMODE_CHOOSER);
   }

   public isGameWonVsAI(): boolean {
      return this.gameData.gamemode === "pve" && this.gameData.winner === PieceColor.WHITE;
   }

   public onPvEWin(name: string | null): void {
      if(!name) {
         this.errService.popupError("Cannot fetch username!");
         return;
      }
      const leaderboardElement: LeaderboardElement = {
         gamemode: "pve",
         name,
         score: this.gameData.turnNumber
      };
      if(leaderboardElement.name.trim() === "") {
         leaderboardElement.name = BuiltInUsernamesUtils.USERNAMES.MISSING;
      }
      this.dbService.addItems(leaderboardElement);
      if(navigator.onLine) {
         this.syncService.syncLeaderboardEntries();
      }
      this.router.navigateByUrl(RouteUrls.LEADERBOARDS);
   }

   private initialize(): boolean {
      const gamemode = this.activatedRoute.snapshot.paramMap.get('mode');
      return Gamemodes.some(mode => {
         if(gamemode === mode) {
            this.gameHandlerService.init(gamemode);
            this.isInitialized = true;
            return true;
         }
         return false;
      });
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
