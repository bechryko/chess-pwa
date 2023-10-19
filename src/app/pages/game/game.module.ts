import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReversePipe, SentenceCasePipe } from '@chess-pipes';
import { TranslocoModule } from '@ngneat/transloco';
import { StoreModule } from '@ngrx/store';
import { gameReducer } from 'src/app/pages/game/store/reducers/game.reducer';
import { ChessboardComponent } from './chessboard/chessboard.component';
import { HighlightPipe } from './chessboard/highlight.pipe';
import { GameHandlerService } from './game-handler.service';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { PveWinDetectorPipe } from './pve-win-detector.pipe';
import { GameState } from './store/states/game.state';

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
      PveWinDetectorPipe,
      MatProgressSpinnerModule,
      StoreModule.forFeature<GameState>("game", gameReducer),
      TranslocoModule,
      SentenceCasePipe
   ],
   providers: [
      GameHandlerService
   ]
})
export class GameModule { }
