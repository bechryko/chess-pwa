import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { ReversePipe } from 'src/app/shared/pipes/reverse.pipe';
import { ChessboardComponent } from './chessboard/chessboard.component';
import { HighlightPipe } from './chessboard/highlight.pipe';
import { GameHandlerService } from './game-handler.service';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { PveWinDetectorPipe } from './pve-win-detector.pipe';

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
      ReversePipe,
      PveWinDetectorPipe
   ],
   providers: [
      GameHandlerService
   ]
})
export class GameModule { }
