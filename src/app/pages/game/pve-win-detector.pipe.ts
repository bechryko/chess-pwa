import { Pipe, PipeTransform } from '@angular/core';
import { CheckType, PieceColor } from '@chess-core';
import { Gamemode } from '@chess-models';

@Pipe({
   name: 'pveWinDetector',
   standalone: true
})
export class PveWinDetectorPipe implements PipeTransform {

   transform(gameData: { gamemode: Gamemode, winner: CheckType, humanPlayers: PieceColor[] }): boolean {
      return gameData.humanPlayers.length === 1 && gameData.humanPlayers[0] === gameData.winner && gameData.gamemode === 'pve';
   }

}
