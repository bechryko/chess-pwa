import { Injectable } from '@angular/core';
import { Subscription, bufferCount, filter, fromEvent, pluck } from 'rxjs';
import { multicast } from '../operators/multicast';

@Injectable({
   providedIn: 'root'
})
export class CheatCodeService {

   private keyDownObservable$ = fromEvent<KeyboardEvent>(document, 'keydown').pipe(
      pluck('key'),
      multicast()
   );
   private registeredCodes: Record<string, Subscription> = {};

   public registerSecretCode(code: string, callback: () => void): void {
      if(code in this.registeredCodes) {
         console.warn(`Secret code '${code}' is already registered!`);
         return;
      }
      this.registeredCodes[code] = this.keyDownObservable$.pipe(
         bufferCount(code.length, 1),
         filter(value => code === value.join(''))
      ).subscribe(() => {
         console.log("Cheat code triggered:", code);
         callback();
      });
   }

   public destroy(): void {
      for(const code in this.registeredCodes) {
         this.registeredCodes[code].unsubscribe();
         delete this.registeredCodes[code];
      }
   }
   
}