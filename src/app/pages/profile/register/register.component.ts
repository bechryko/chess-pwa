import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthUser } from 'src/app/shared/models/authUsers';
import { BuiltInUsernamesUtils } from 'src/app/shared/utils/built-in-usernames.utils';

@Component({
   selector: 'app-register',
   templateUrl: './register.component.html',
   styleUrls: ['../profile.component.scss']
})
export class RegisterComponent implements OnInit {

   @Input() disableSubmit: boolean = true;
   @Output() registerEvent: EventEmitter<AuthUser> = new EventEmitter();

   public registerForm = new FormGroup({
      email: new FormControl('', [
         Validators.required,
         Validators.email
      ]),
      username: new FormControl('', []),
      password: new FormControl('', [
         Validators.required,
         Validators.minLength(6)
      ]),
      confirmPassword: new FormControl('', [
         Validators.required
      ])
   });

   ngOnInit() {
      this.registerForm.controls.confirmPassword.addValidators(this.confirmPasswordValidator());
   }

   public onRegisterSubmit(): void {
      const name = this.registerForm.value.username ?? BuiltInUsernamesUtils.USERNAMES.DEFAULT;
      this.registerEvent.emit({
         email: this.registerForm.value.email ?? "",
         name: name.trim(),
         password: this.registerForm.value.password ?? ""
      });
   }

   private confirmPasswordValidator(): ValidatorFn { //TODO
      return (control: AbstractControl): ValidationErrors | null => {
         return this.registerForm.value.password === control.value ? null : { notMatchingPasswords: { value: control.value } };
      };
   }
}
