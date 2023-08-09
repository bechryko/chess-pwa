import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

import { LeaderboardsRoutingModule } from './leaderboards-routing.module';
import { LeaderboardsComponent } from './leaderboards.component';
import { MatButtonModule } from '@angular/material/button';
import { SortPipe } from './sort.pipe';


@NgModule({
   declarations: [
      LeaderboardsComponent,
      SortPipe
   ],
   imports: [
      CommonModule,
      LeaderboardsRoutingModule,
      MatTabsModule,
      MatButtonModule,
      MatProgressSpinnerModule
   ]
})
export class LeaderboardsModule { }
