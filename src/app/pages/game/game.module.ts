import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { ReversePipe } from '../../reverse.pipe';
import { ChessboardComponent } from './chessboard/chessboard.component';
import { HighlightPipe } from './chessboard/highlight.pipe';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';

@NgModule({
   declarations: [
      GameComponent,
      ReversePipe,
      ChessboardComponent
   ],
   imports: [
      CommonModule,
      GameRoutingModule,
      MatButtonModule,
      HighlightPipe
   ]
})
export class GameModule { }
