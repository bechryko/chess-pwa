import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Position } from 'src/assets/chess/utility';

@Component({
   selector: 'app-chessboard',
   templateUrl: './chessboard.component.html',
   styleUrls: ['./chessboard.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChessboardComponent {
   @Input() displayBoard: string[][] = [];
   @Input() highlightedTiles: Position[] = [];
   @Input() playerSets: Record<"white" | "black", string> = {
      white: "viking",
      black: "default"
   }
   @Output() tileClick: EventEmitter<Position> = new EventEmitter();
}
