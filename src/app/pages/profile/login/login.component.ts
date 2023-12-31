import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SimpleUserWithoutUsername } from '../profile.model';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['../profile.component.scss']
})
export class LoginComponent {

   @Output() loginEvent: EventEmitter<SimpleUserWithoutUsername> = new EventEmitter();

   loginForm = new FormGroup({
      email: new FormControl('', [
         Validators.required, 
         Validators.email
      ]),
      password: new FormControl('', [
         Validators.required,
         Validators.minLength(6)
      ])
   });

   onLoginSubmit() {
      this.loginEvent.emit({
         email: this.loginForm.value.email ?? "",
         password: this.loginForm.value.password ?? ""
      });
   }
}
