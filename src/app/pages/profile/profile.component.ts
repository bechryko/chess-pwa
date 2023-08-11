import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/services/model';
import { UserService } from 'src/app/services/user.service';

@Component({
   selector: 'app-profile',
   templateUrl: './profile.component.html',
   styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

   constructor(private router: Router, private location: Location, private authService: AuthService, private userService: UserService) { }

   loginSubmit(event: { email: string, password: string }) {
      const { email, password } = event;
      this.authService.login(email, password)
         .then((userCredential) => {
            this.router.navigateByUrl('/menu');
         })
         .catch((error) => {
            console.error(error);
         });
   }

   registerSubmit(event: { email: string, username: string, password: string }) {
      const { email, username, password } = event;
      this.authService.register(email, password)
         .then((userCredential) => {
            this.router.navigateByUrl('/menu');
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
