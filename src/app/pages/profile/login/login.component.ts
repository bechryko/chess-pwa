import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthUserWithoutName } from 'src/app/shared/models/authUsers';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['../profile.component.scss']
})
export class LoginComponent {

   @Input() disableSubmit: boolean = true;
   @Output() loginEvent: EventEmitter<AuthUserWithoutName> = new EventEmitter();

   public loginForm = new FormGroup({
      email: new FormControl('', [
         Validators.required, 
         Validators.email
      ]),
      password: new FormControl('', [
         Validators.required,
         Validators.minLength(6)
      ])
   });

   public onLoginSubmit(): void {
      this.loginEvent.emit({
         email: this.loginForm.value.email ?? "",
         password: this.loginForm.value.password ?? ""
      });
   }
}
