import { Injectable } from '@angular/core';
import { Gamemode } from '../Gamemode';

@Injectable({
   providedIn: 'root'
})
export class GamemodeService {
   private gamemode?: Gamemode;

   constructor() { }

   selectGamemode(mode: Gamemode): void {
      this.gamemode = mode;
   }

   isSelectedGamemode(): boolean {
      return this.gamemode !== undefined;
   }

   lastGamemode(): Gamemode {
      if(!this.isSelectedGamemode()) {
         throw new Error("Error: no gamemode selected");
      }
      return this.gamemode!;
   }
}
