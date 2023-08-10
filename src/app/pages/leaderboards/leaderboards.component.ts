import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { LeaderboardElement } from '../../services/model';
import { LocalDatabaseService } from 'src/app/services/local-database.service';
import { Router } from '@angular/router';

@Component({
   selector: 'app-leaderboards',
   templateUrl: './leaderboards.component.html',
   styleUrls: ['./leaderboards.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeaderboardsComponent implements OnInit {
   public leaderboardElements$?: Observable<LeaderboardElement[]>;

   constructor(private router: Router, private dbService: LocalDatabaseService) { }

   ngOnInit(): void {
      const interval = setInterval(() => {
         if(this.dbService.isLoaded) {
            this.leaderboardElements$ = this.dbService.loadItems();
            clearInterval(interval);
         }
      }, 500);
   }

   public toMenu() {
      this.router.navigateByUrl('/menu');
   }
}
