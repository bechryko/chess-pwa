import { Clipboard } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
   selector: 'app-user-info',
   standalone: true,
   imports: [
      CommonModule,
      MatProgressSpinnerModule,
      MatSnackBarModule
   ],
   templateUrl: './user-info.component.html',
   styleUrls: ['./user-info.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfoComponent {
   isUserLoggedIn = false;
   isUserLoading = true;
   public username = "";

   constructor(
      private authService: AuthService, 
      private userService: UserService, 
      private cdr: ChangeDetectorRef,
      private clipboard: Clipboard,
      private copySnackbar: MatSnackBar
   ) { }

   ngOnInit(): void {
      this.authService.isUserLoggedIn().subscribe({
         next: user => {
            this.isUserLoading = false;
            this.isUserLoggedIn = !!user;
            this.userService.getUserName(user?.uid ?? "").then((username: string) => {
               this.username = username;
               localStorage.setItem("chessPWA-user", JSON.stringify(this.username));
               this.cdr.markForCheck();
            }).catch((error) => {
               console.error(error);
            });
            this.cdr.markForCheck();
         },
         error: error => {
            console.error(error);
         }
      });
   }

   public copyUserName(): void {
      if(!this.isUserLoggedIn) {
         return;
      }
      this.clipboard.copy(this.username);
      this.copySnackbar.open("Username copied to clipboard!", "Dismiss", { duration: 2000 });
   }
   
}
