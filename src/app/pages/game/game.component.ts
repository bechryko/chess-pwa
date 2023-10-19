import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Move, PieceColor, Position } from '@chess-core';
import { Route } from '@chess-enums';
import { GameData, LeaderboardElement } from '@chess-models';
import { AuthService, ErrorService, LeaderboardStoreService } from '@chess-services';
import { BuiltInUsernamesUtils } from '@chess-utils';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { Gamemodes } from 'src/app/shared/models/Gamemode'; //TODO: util
import { GameHandlerService } from './game-handler.service';

@Component({
   selector: 'app-game',
   templateUrl: './game.component.html',
   styleUrls: ['./game.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit, OnDestroy {
   private selectedPosition: Position | null = null;
   public gameData: GameData;
   public highlighted: Position[] = [];
   public isInitialized = false;
   private movesMade = false;

   public username$: Observable<string>;

   constructor(
      private router: Router,
      private gameHandlerService: GameHandlerService,
      private cdr: ChangeDetectorRef,
      private activatedRoute: ActivatedRoute,
      private authService: AuthService,
      private errService: ErrorService,
      private leaderboardStore: LeaderboardStoreService,
      public transloco: TranslocoService
   ) {
      this.gameData = this.gameHandlerService.getGameData();
      this.username$ = this.authService.username$;
   }

   public ngOnInit(): void {
      if (!this.initialize()) {
         this.router.navigateByUrl(Route.GAMEMODE_CHOOSER);
      }
      this.syncGameData();
      if (!this.gameHandlerService.isHumanTurn()) {
         this.requestAIMove(0);
         this.movesMade = true;
      }
   }

   public canDeactivate(): boolean {
      return !this.movesMade || this.gameData.winner !== 'none';
   }

   public ngOnDestroy(): void {
      if(this.gameData.winner === "none") {
         this.gameHandlerService.saveGame();
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
         if (this.gameHandlerService.isMoveValid(playerMove)) {
            this.gameHandlerService.makeMove(playerMove);
            this.movesMade = true;
            this.syncGameData();
            this.highlightMove(playerMove);
            if (this.gameData.gamemode === "pve" && this.gameData.winner === "none") {
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
      this.router.navigateByUrl(Route.GAMEMODE_CHOOSER);
   }

   public isGameWonVsAI(): boolean {
      return this.gameData.gamemode === "pve" && this.gameData.winner === PieceColor.WHITE;
   }

   public onPvEWin(name: string | null): void {
      if (!name) {
         this.errService.popupError(this.transloco.translate("errors.user-c1"));
         return;
      }
      const leaderboardElement: LeaderboardElement = {
         gamemode: "pve",
         name,
         score: this.gameData.turnNumber
      };
      if (leaderboardElement.name.trim() === "") {
         leaderboardElement.name = BuiltInUsernamesUtils.USERNAMES.MISSING;
      }
      this.leaderboardStore.storeItem(leaderboardElement);
      this.router.navigateByUrl(Route.LEADERBOARDS);
   }

   private initialize(): boolean {
      const gamemode = this.activatedRoute.snapshot.paramMap.get('mode');
      return Gamemodes.some(mode => {
         if (gamemode === mode) {
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
