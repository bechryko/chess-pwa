import { Pipe, PipeTransform } from '@angular/core';
import { Gamemode } from 'src/app/shared/Gamemode';
import { CheckType } from 'src/assets/chess/Game';
import { PieceColor } from 'src/assets/chess/utility';

@Pipe({
   name: 'pveWinDetector',
   standalone: true
})
export class PveWinDetectorPipe implements PipeTransform {

   transform(gameData: { gamemode: Gamemode, winner: CheckType, humanPlayers: PieceColor[] }): boolean {
      return gameData.humanPlayers.length === 1 && gameData.humanPlayers[0] === gameData.winner && gameData.gamemode === 'pve';
   }

}
