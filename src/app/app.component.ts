import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CheatCodeService } from './shared/services/cheat-code.service';
import { DatabaseSyncService } from './shared/services/database-sync.service';
import { LocalDatabaseService } from './shared/services/local-database.service';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
   constructor(
      private syncService: DatabaseSyncService,
      private cheatCodeService: CheatCodeService,
      private localDbService: LocalDatabaseService
   ) { }

   ngOnInit(): void {
      if(navigator.onLine) {
         this.syncService.syncLeaderboardEntries();
      }
      addEventListener('online', () => {
         this.syncService.syncLeaderboardEntries();
      });
      this.cheatCodeService.registerSecretCode("leaderboardtest", () => {
         this.localDbService.addItem({
            gamemode: "pve",
            name: "cheat",
            score: +(window.prompt("Enter your score:") ?? 0)
         });
      });
      this.cheatCodeService.registerSecretCode("syncdatabases", () => {
         this.syncService.syncLeaderboardEntries();
      })
   }

   ngOnDestroy(): void {
      this.cheatCodeService.destroy();
   }
}
