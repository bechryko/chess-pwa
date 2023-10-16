import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { AuthUser } from 'src/app/shared/models/authUsers';
import { BuiltInUsernamesUtils } from 'src/app/shared/utils/built-in-usernames.utils';
import { RegisterFormGroup } from './register-form-group.model';
import { UniqueUsernameValidator } from './unique-username-validator';

@Component({
   selector: 'app-register',
   templateUrl: './register.component.html',
   styleUrls: ['../profile.component.scss'],
   providers: [
      UniqueUsernameValidator
   ]
})
export class RegisterComponent {

   @Input() disableSubmit: boolean = true;
   @Output() registerEvent: EventEmitter<AuthUser> = new EventEmitter();

   public registerForm: RegisterFormGroup;

   constructor(
      private formBuilder: NonNullableFormBuilder,
      private usernameValidator: UniqueUsernameValidator
   ) {
      this.registerForm = this.formBuilder.group({
         email: ['', [Validators.required, Validators.email]],
         username: ['', [], [(control: AbstractControl) => this.usernameValidator.validate(control)]],
         password: ['', [Validators.required, Validators.minLength(6)]],
         confirmPassword: ['', [Validators.required]]
      }, {
         validators: [this.confirmPasswordMatchValidator]
      });
   }

   public onRegisterSubmit(): void {
      const name = this.registerForm.value.username ?? BuiltInUsernamesUtils.USERNAMES.DEFAULT;
      this.registerEvent.emit({
         email: this.registerForm.value.email ?? "",
         name: name.trim(),
         password: this.registerForm.value.password ?? ""
      });
   }

   private confirmPasswordMatchValidator(control: AbstractControl): ValidationErrors | null {
      return control.value.password === control.value.confirmPassword ? null : { notMatchingPasswords: true };
   }
}
