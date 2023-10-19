import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthUserWithoutName } from '@chess-models';
import { LoginFormGroup } from './login-form-group.model';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['../profile.component.scss']
})
export class LoginComponent {

   @Input() disableSubmit: boolean = true;
   @Output() loginEvent: EventEmitter<AuthUserWithoutName> = new EventEmitter();

   public loginForm: LoginFormGroup;

   constructor(
      private formBuilder: NonNullableFormBuilder
   ) {
      this.loginForm = this.formBuilder.group({
         email: ['', [Validators.required, Validators.email]],
         password: ['', [Validators.required, Validators.minLength(6)]]
      });
   }

   public onLoginSubmit(): void {
      this.loginEvent.emit({
         email: this.loginForm.value.email ?? "",
         password: this.loginForm.value.password ?? ""
      });
   }
}
