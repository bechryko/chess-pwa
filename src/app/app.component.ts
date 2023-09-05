import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DatabaseSyncService } from './shared/services/database-sync.service';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
   constructor(
      private syncService: DatabaseSyncService,
   ) { }

   ngOnInit(): void {
      if(navigator.onLine) {
         this.syncService.syncLeaderboardEntries();
      }
      addEventListener('online', () => {
         console.log("online")
         this.syncService.syncLeaderboardEntries();
      });
   }
}
