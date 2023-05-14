import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { User } from './services/model';
import { DatabaseSyncService } from './services/database-sync.service';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})
export class AppComponent {
   title = 'chess';

   loggedInUser?: firebase.default.User | null;
   public username: string = "";

   constructor(private authService: AuthService, private userService: UserService, private syncService: DatabaseSyncService) { }

   ngOnInit(): void {
      this.authService.isUserLoggedIn().subscribe((user) => {
         this.loggedInUser = user;
         this.userService.getUserName(user?.uid ?? "").then((username: string) => {
            this.username = username;
            localStorage.setItem("chessPWA-user", JSON.stringify(this.username));
         }).catch((error) => {
            console.error(error);
         });
      }, error => {
         console.error(error);
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
