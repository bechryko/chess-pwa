import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Position } from 'src/assets/chess/utility';

@Component({
   selector: 'app-chessboard',
   templateUrl: './chessboard.component.html',
   styleUrls: ['./chessboard.component.scss']
})
export class ChessboardComponent {
   @Input() displayBoard: string[][] = [];
   @Input() highlightedTiles: Position[] = [];
   @Output() tileClick: EventEmitter<Position> = new EventEmitter();
}
