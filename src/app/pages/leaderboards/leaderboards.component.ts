import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalDatabaseService } from 'src/app/services/local-database.service';
import { LeaderboardElement } from '../../services/model';

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
      this.leaderboardElements$ = this.dbService.loadItems();
   }

   public toMenu() {
      this.router.navigateByUrl('/menu');
   }
}
