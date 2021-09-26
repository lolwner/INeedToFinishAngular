import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/authService';
import { Gender } from 'src/app/shared/gendersEnum';
import { RegisterUser } from 'src/app/shared/registerUser';
import { ConfirmPasswordValidator } from 'src/app/shared/validators/confirm-password.validator';



@Component({
  selector: 'app-register-reactive',
  templateUrl: './register-reactive.component.html',
  styleUrls: ['./register-reactive.component.css']
})
export class RegisterReactiveComponent implements OnInit {

  pwdPattern = "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$";
  eGender = Gender;

  constructor(public fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

  profileForm = this.fb.group({
    //TODO: remove that group, rename to not use 'form', rename field to be names as ..Conrols
    //profileUserDataForm: this.fb.group(
     // {
        userName: this.fb.control("", [Validators.required, Validators.minLength(6)]),
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        gender: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        address: this.fb.array([]),
   //   }),
    //TODO: rename to passwordGroup
    profilePasswordForm: this.fb.group(
      {
        password: this.fb.control("", Validators.required),
        confirmPassword: ["", Validators.required]
      },
      {
        validator: ConfirmPasswordValidator('password', 'confirmPassword')
      })
  });

  addAddress() {
    const addressForm = this.fb.group({
      lineOne: 'City, state, etc.',
      lineTwo: ''
    });

    this.addressArr.push(addressForm);
  }

  ngOnInit() {
  };

  get profileUserControl(): FormGroup {
    console.log(this.profileForm);
    return this.profileForm.get("profileUserDataForm") as FormGroup;
  }

  get userNameControl() : FormControl {
    return this.profileUserControl.get("userName") as FormControl;
  }


  get lastName() {
    return this.profileForm.get(["profileUserDataForm", "lastName"]);
  }

  get gender() {
    return this.profileForm.get(["profileUserDataForm", "gender"]);
  }

  get email() {
    return this.profileForm.get(["profileUserDataForm", "email"]);
  }

  get addressArr() {
    return this.profileForm.get(["profileUserDataForm", "address"]) as FormArray;
  }

  get password() {
    return this.profileForm.get(["profilePasswordForm", "password"]);
  }

  get confirmPassword() {
    return this.profileForm.get(["profilePasswordForm", "confirmPassword"]);
  }




  submit() {
    var model: RegisterUser = {
      userName: this.profileForm.value.profileUserDataForm.userName,
      email: this.profileForm.value.profileUserDataForm.email,
      gender: this.profileForm.value.profileUserDataForm.gender,
      firstName: this.profileForm.value.profileUserDataForm.firstName,
      lastName: this.profileForm.value.profileUserDataForm.lastName,
      password: this.profileForm.value.profilePasswordForm.password,
      confirmPassword: ''
    };

    console.log(this.profileForm.value);
    console.log(model);
    this.authService.testRequest(model).subscribe(val => this.processPostBack(val), (err => { console.log(err) }))


  }

  public processPostBack(value: any) {
    console.log(value);
    this.router.navigate(['/']);
  }

}
