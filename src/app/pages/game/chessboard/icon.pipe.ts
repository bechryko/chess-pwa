import { Pipe, PipeTransform } from '@angular/core';
import { PieceSet } from 'src/app/shared/models/PieceSet';
import { PieceColor } from 'src/assets/chess/utility';

@Pipe({
   name: 'icon',
   standalone: true
})
export class IconPipe implements PipeTransform {

   transform(piece: string, playerSets: Record<PieceColor, PieceSet>): string {
      if(piece === "empty") {
         return "assets/images/chess-empty.png";
      }
      const pieceColor = piece.split('-')[1] as PieceColor;
      return "assets/images/sets/" + playerSets[pieceColor] + "/chess-" + piece + ".png";
   }

}
