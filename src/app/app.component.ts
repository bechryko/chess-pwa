import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Languages } from './shared/enums/languages';
import { CheatCodeService } from './shared/services/cheat-code.service';
import { LeaderboardStoreService } from './shared/services/leaderboard-store.service';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
   constructor(
      private cheatCodeService: CheatCodeService,
      private leaderboardStore: LeaderboardStoreService,
      private translate: TranslateService
   ) {
      this.translate.addLangs(Object.values(Languages));
      this.translate.use(Languages.ENGLISH);
   }

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
