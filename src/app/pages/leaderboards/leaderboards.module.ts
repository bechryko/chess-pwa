import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

import { LeaderboardsRoutingModule } from './leaderboards-routing.module';
import { LeaderboardsComponent } from './leaderboards.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    LeaderboardsComponent
  ],
  imports: [
    CommonModule,
    LeaderboardsRoutingModule,
    MatTabsModule,
    MatButtonModule,
  ]
})
export class LeaderboardsModule { }
