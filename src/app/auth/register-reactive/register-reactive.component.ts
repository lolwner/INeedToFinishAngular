import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmPasswordValidator, } from 'src/app/shared/validators/confirm-password.validator';

@Component({
  selector: 'app-register-reactive',
  templateUrl: './register-reactive.component.html',
  styleUrls: ['./register-reactive.component.css']
})
export class RegisterReactiveComponent implements OnInit {

  constructor(public fb: FormBuilder) {
  }

  profileForm = this.fb.group(
    {
      firstName: [""],
      lastName: [""],
      email: [""],
      password: [""],
      confirmPassword: [""]
    },
    {
      validator: ConfirmPasswordValidator('password', 'confirmPassword')
    })


  ngOnInit() {
  };

  submit() {
    console.log(this.profileForm.value);
  }

}
