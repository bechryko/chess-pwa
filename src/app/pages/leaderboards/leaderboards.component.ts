import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Observable } from 'rxjs';
import { LeaderboardElement } from '../../services/model';
import { LocalDatabaseService } from 'src/app/services/local-database.service';

@Component({
   selector: 'app-leaderboards',
   templateUrl: './leaderboards.component.html',
   styleUrls: ['./leaderboards.component.scss']
})
export class LeaderboardsComponent implements OnInit {
   public leaderboardElements$?: Observable<LeaderboardElement[]>;

   constructor(private location: Location, private dbService: LocalDatabaseService) { }

   ngOnInit(): void {
      if(this.dbService.isLoaded) {
         this.leaderboardElements$ = this.dbService.loadItems();
      } else {
         setTimeout(this.ngOnInit.bind(this), 500);
      }
   }

   public goBack() {
      this.location.back();
   }
}
