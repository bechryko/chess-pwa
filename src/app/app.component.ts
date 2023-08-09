import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { DatabaseSyncService } from './services/database-sync.service';
import { UserService } from './services/user.service';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
   title = 'chess';

   loggedInUser?: firebase.default.User | null; //TODO: null or undefined?
   public username: string = ""; //TODO: redundant type

   constructor(
      private authService: AuthService, 
      private userService: UserService, 
      private syncService: DatabaseSyncService,
      private cdr: ChangeDetectorRef
   ) { }

   ngOnInit(): void {
      this.authService.isUserLoggedIn().subscribe({
         next: user => {
            this.loggedInUser = user;
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

      if(navigator.onLine) {
         this.syncService.syncLeaderboardEntries();
      }
      addEventListener('online', () => {
         console.log("online")
         this.syncService.syncLeaderboardEntries();
      });
   }
}
