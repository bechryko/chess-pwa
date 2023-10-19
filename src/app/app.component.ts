import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CheatCodeService, LeaderboardStoreService } from '@chess-services';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
   constructor(
      private cheatCodeService: CheatCodeService,
      private leaderboardStore: LeaderboardStoreService
   ) { }

   ngOnInit(): void {
      this.leaderboardStore.pullDataFromCloud();
      this.cheatCodeService.registerSecretCode("leaderboardtest", () => {
         this.leaderboardStore.storeItem({
            gamemode: "pve",
            name: "cheat",
            score: Number(window.prompt("Enter your score:") ?? 0)
         });
      });
      this.cheatCodeService.registerSecretCode("refreshleaderboards", () => {
         this.leaderboardStore.pullDataFromCloud();
      });
   }

   ngOnDestroy(): void {
      this.cheatCodeService.destroy();
   }
}
