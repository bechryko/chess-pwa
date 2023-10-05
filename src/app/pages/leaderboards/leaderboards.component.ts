import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RouteUrls } from 'src/app/shared/enums/routes';
import { LeaderboardElement } from 'src/app/shared/models/LeaderboardElements';
import { LeaderboardStoreService } from 'src/app/shared/services/leaderboard-store.service';

@Component({
   selector: 'app-leaderboards',
   templateUrl: './leaderboards.component.html',
   styleUrls: ['./leaderboards.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeaderboardsComponent {
   public leaderboardElements$?: Observable<LeaderboardElement[]>;

   constructor(
      private router: Router, 
      private leaderboardStoreService: LeaderboardStoreService
   ) {
      this.leaderboardElements$ = this.leaderboardStoreService.storedItems$;
   }

   public toMenu() {
      this.router.navigateByUrl(RouteUrls.MENU);
   }
}
