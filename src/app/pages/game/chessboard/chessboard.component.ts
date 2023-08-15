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
   @Output() tileClick: EventEmitter<{ x: number, y: number }> = new EventEmitter();

   isTileHighlighted(x: number, y: number): boolean {
      return this.highlightedTiles.some(t => t.x === x && t.y === y);
   }
}
