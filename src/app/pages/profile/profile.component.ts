import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouteUrls } from 'src/app/shared/enums/routes';
import { User } from 'src/app/shared/models/User';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { SimpleUser, SimpleUserWithoutUsername } from './profile.model';

@Component({
   selector: 'app-profile',
   templateUrl: './profile.component.html',
   styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

   constructor(private router: Router, private location: Location, private authService: AuthService, private userService: UserService) { }

   loginSubmit(userData: SimpleUserWithoutUsername) {
      const { email, password } = userData;
      this.authService.login(email, password)
         .then((userCredential) => {
            this.router.navigateByUrl(RouteUrls.MENU);
         })
         .catch((error) => {
            console.error(error);
         });
   }

   registerSubmit(userData: SimpleUser) {
      const { email, username, password } = userData;
      this.authService.register(email, password)
         .then((userCredential) => {
            this.router.navigateByUrl(RouteUrls.MENU);
            const user: User = {
               id: userCredential.user?.uid ?? "",
               name: username,
            };
            this.userService.createUser(user).catch((error) => { console.error(error); });
         })
         .catch((error) => {
            console.error(error);
         });
   }

   goBack() {
      this.location.back();
   }
}
