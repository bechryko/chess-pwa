import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
   providedIn: 'root'
})
export class ErrorService {

   private static readonly MIN_POPUP_LENGTH = 2000;
   private static readonly MESSAGE_LENGTH_MULTIPLIER = 40;

   constructor(
      private errorSnackbar: MatSnackBar,
      private transloco: TranslocoService
   ) { }

   public popupError(message: string, time?: number, action?: string): void {
      this.errorSnackbar.open(
         message,
         action ?? this.transloco.translate("shared.snackbar.dismiss"),
         { 
            duration: time ?? Math.max(ErrorService.MESSAGE_LENGTH_MULTIPLIER * String(message).length, ErrorService.MIN_POPUP_LENGTH)
         }
      );
   }
   
}
