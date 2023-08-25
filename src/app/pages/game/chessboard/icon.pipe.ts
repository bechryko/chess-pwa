import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
   name: 'icon',
   standalone: true
})
export class IconPipe implements PipeTransform {

   transform(piece: string, playerSets: Record<"white" | "black", string>): string {
      if(piece === "empty") {
         return "assets/images/chess-empty.png";
      }
      const pieceColor = piece.split('-')[1] as "white" | "black";
      return "assets/images/sets/" + playerSets[pieceColor] + "/chess-" + piece + ".png";
   }

}
