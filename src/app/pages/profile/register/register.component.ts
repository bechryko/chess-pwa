import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
   selector: 'app-register',
   templateUrl: './register.component.html',
   styleUrls: ['../profile.component.scss']
})
export class RegisterComponent {

   @Output() registerEvent: EventEmitter<{ email: string, username: string, password: string }> = new EventEmitter();

   registerForm = new FormGroup({
      email: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl('')
   });

   onRegisterSubmit() {
      this.registerEvent.emit({
         email: this.registerForm.value.email ?? "",
         username: this.registerForm.value.username ?? "Anonymous",
         password: this.registerForm.value.password ?? ""
      });
   }
}
