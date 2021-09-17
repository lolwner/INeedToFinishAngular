import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmPasswordValidator, } from 'src/app/shared/validators/confirm-password.validator';

@Component({
  selector: 'app-register-reactive',
  templateUrl: './register-reactive.component.html',
  styleUrls: ['./register-reactive.component.css']
})
export class RegisterReactiveComponent implements OnInit {
  // profileForm = new FormGroup({
  //   firstName: new FormControl('', Validators.required),
  //   lastName: new FormControl('', Validators.required),
  //   email: new FormControl('', Validators.required),
  //   password: new FormControl('', Validators.required),
  //   confirmPassword: new FormControl('', Validators.required)
  // },

  constructor(public fb: FormBuilder) {
  }

  registerForm: FormGroup;



  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        email: ["", Validators.required],
        password: ["", Validators.required],
        confirmPassword: ["", Validators.required]
      },
      {
        validator: ConfirmPasswordValidator('password', 'confirmPassword')
      })
  };

  submit() {
    console.log(this.profileForm.value);
  }

}
