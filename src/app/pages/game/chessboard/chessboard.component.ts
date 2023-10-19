import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Position } from '@chess-core';

@Component({
   selector: 'app-chessboard',
   templateUrl: './chessboard.component.html',
   styleUrls: ['./chessboard.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChessboardComponent {
   @Input() displayBoard: string[][] = [];
   @Input() highlightedTiles: Position[] = [];
   @Output() tileClick: EventEmitter<Position> = new EventEmitter();
}
