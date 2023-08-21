import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
   selector: 'app-register',
   templateUrl: './register.component.html',
   styleUrls: ['../profile.component.scss']
})
export class RegisterComponent implements OnInit {

   @Output() registerEvent: EventEmitter<{ email: string, username: string, password: string }> = new EventEmitter();

   registerForm = new FormGroup({
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

   onRegisterSubmit() {
      console.log(this.registerForm.errors)
      this.registerEvent.emit({
         email: this.registerForm.value.email ?? "",
         username: this.registerForm.value.username ?? "Anonymous",
         password: this.registerForm.value.password ?? ""
      });
   }

   private confirmPasswordValidator(): ValidatorFn { //TODO
      return (control: AbstractControl): ValidationErrors | null => {
         return this.registerForm.value.password === control.value ? null : { notMatchingPasswords: { value: control.value } };
      };
   }
}
