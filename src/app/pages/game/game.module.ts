import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { ReversePipe } from '../../reverse.pipe';
import { MatButtonModule } from '@angular/material/button';
import { ChessboardComponent } from './chessboard/chessboard.component';

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
   ]
})
export class GameModule { }
