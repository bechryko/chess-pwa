import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
   providedIn: 'root'
})
export class ErrorService {

   constructor(
      private errorSnackbar: MatSnackBar
   ) { }

   public popupError(message: string, time = 2000, action = "Dismiss"): void {
      this.errorSnackbar.open(message, action, { duration: time });
   }
   
}
