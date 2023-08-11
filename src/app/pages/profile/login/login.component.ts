import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['../profile.component.scss']
})
export class LoginComponent {

   @Output() loginEvent: EventEmitter<{ email: string, password: string }> = new EventEmitter();

   loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
   });

   onLoginSubmit() {
      this.loginEvent.emit({
         email: this.loginForm.value.email ?? "",
         password: this.loginForm.value.password ?? ""
      });
   }
}
