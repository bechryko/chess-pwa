import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
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

  constructor(private location: Location) {}

  onLoginSubmit() {
    console.log(this.loginForm.value);
    //TODO
  }

  onRegisterSubmit() {
    console.log(this.registerForm.value);
    //TODO
  }

  goBack() {
    this.location.back();
  }
}
