import { Pipe, PipeTransform } from '@angular/core';
import { Position } from '@chess-core';

@Pipe({
   name: 'isHighlighted',
   standalone: true
})
export class HighlightPipe implements PipeTransform {

   transform(value: Position, highlightedTiles: Position[]): boolean {
      return highlightedTiles.some(t => t.x === value.x && t.y === value.y);
   }

}
