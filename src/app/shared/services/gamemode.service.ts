import { Injectable } from '@angular/core';
import { Gamemode } from '../Gamemode';

@Injectable({
   providedIn: 'root'
})
export class GamemodeService {
   private gamemode: Gamemode = "pvp";
   private isInitial = true;

   public selectGamemode(mode: Gamemode): void {
      this.gamemode = mode;
      this.isInitial = false;
   }

   public lastGamemode(): Gamemode {
      if(this.isInitial) {
         console.warn("No gamemode specified; default mode: " + this.gamemode);
      }
      return this.gamemode;
   }
}
