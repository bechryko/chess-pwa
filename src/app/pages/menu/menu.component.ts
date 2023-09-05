import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
   selector: 'app-menu',
   templateUrl: './menu.component.html',
   styleUrls: ['./menu.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {
   loggedInUser?: firebase.default.User | null;

   constructor(
      private authService: AuthService,
      private cdr: ChangeDetectorRef
   ) { }

   ngOnInit(): void {
      this.authService.isUserLoggedIn().subscribe({
         next: user => {
            this.loggedInUser = user;
            this.cdr.markForCheck();
         },
         error: error => {
            console.error(error);
         }
      });
   }

   public logout() {
      localStorage.setItem("chessPWA-user", "Unknown user");
      this.authService.logout()
         .catch((error) => {
            console.error(error);
         });
      this.cdr.markForCheck();
   }
}
