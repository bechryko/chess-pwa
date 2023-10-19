import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouteUrls } from '@chess-enums';
import { LeaderboardElement } from '@chess-models';
import { LeaderboardStoreService } from '@chess-services';
import { Observable } from 'rxjs';

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
