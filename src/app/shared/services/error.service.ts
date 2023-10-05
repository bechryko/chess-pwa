import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
   providedIn: 'root'
})
export class ErrorService {

   private static readonly MIN_POPUP_LENGTH = 2000;
   private static readonly MESSAGE_LENGTH_MULTIPLIER = 40;

   constructor(
      private errorSnackbar: MatSnackBar
   ) { }

   public popupError(message: string, time?: number, action = "Dismiss"): void {
      time ??= Math.max(ErrorService.MESSAGE_LENGTH_MULTIPLIER * String(message).length, ErrorService.MIN_POPUP_LENGTH);
      this.errorSnackbar.open(message, action, { duration: time });
   }
   
}
