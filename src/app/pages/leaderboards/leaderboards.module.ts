import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { SortPipe } from '@chess-pipes';
import { TranslocoModule } from '@ngneat/transloco';
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
