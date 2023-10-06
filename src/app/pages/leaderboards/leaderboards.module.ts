import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';

import { MatButtonModule } from '@angular/material/button';
import { TranslocoModule } from '@ngneat/transloco';
import { SortPipe } from 'src/app/shared/pipes/sort.pipe';
import { LeaderboardsRoutingModule } from './leaderboards-routing.module';
import { LeaderboardsComponent } from './leaderboards.component';
import { ListComponent } from './list/list.component';


@NgModule({
   declarations: [
      LeaderboardsComponent,
      ListComponent
   ],
   imports: [
      CommonModule,
      LeaderboardsRoutingModule,
      MatTabsModule,
      MatButtonModule,
      MatProgressSpinnerModule,
      SortPipe,
      TranslocoModule
   ]
})
export class LeaderboardsModule { }
