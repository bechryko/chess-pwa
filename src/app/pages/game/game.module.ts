import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { HighlightPipe } from 'src/app/shared/pipes/highlight.pipe';
import { ReversePipe } from 'src/app/shared/pipes/reverse.pipe';
import { ChessboardComponent } from './chessboard/chessboard.component';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';

@NgModule({
   declarations: [
      GameComponent,
      ChessboardComponent
   ],
   imports: [
      CommonModule,
      GameRoutingModule,
      MatButtonModule,
      HighlightPipe,
      ReversePipe
   ]
})
export class GameModule { }
