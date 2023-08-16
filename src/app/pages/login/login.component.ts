import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/services/model';
import { UserService } from 'src/app/services/user.service';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

   loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
   });

   registerForm = new FormGroup({
      email: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl('')
   });

   constructor(private router: Router, private location: Location, private authService: AuthService, private userService: UserService) { }

   onLoginSubmit() {
      this.authService.login(this.loginForm.value.email ?? "", this.loginForm.value.password ?? "")
         .then((userCredential) => {
            this.router.navigateByUrl('/menu');
         })
         .catch((error) => {
            console.error(error);
         });
   }

   onRegisterSubmit() {
      this.authService.register(this.registerForm.value.email ?? "", this.registerForm.value.password ?? "")
         .then((userCredential) => {
            this.router.navigateByUrl('/menu');
            const user: User = {
               id: userCredential.user?.uid ?? "",
               name: this.registerForm.value.username ?? "Anonymous",
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
