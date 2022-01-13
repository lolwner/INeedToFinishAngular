import { ChangeDetectionStrategy, Component, ElementRef, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { merge, Observable, timer } from 'rxjs';
import { AuthService } from 'src/app/core/services/authService';
import { Gender } from 'src/app/shared/gendersEnum';
import { RegisterUser } from 'src/app/shared/registerUser';
import { ConfirmPasswordValidator } from 'src/app/shared/validators/confirm-password.validator';
import { FormValidationService } from 'src/app/shared/validators/formValidationService';
import { switchMap, distinctUntilChanged, map } from 'rxjs/operators';
import { UsernameResponse } from 'src/app/shared/usernameResponse';

@Component({
  selector: 'app-register-reactive',
  templateUrl: './register-reactive.component.html',
  styleUrls: ['./register-reactive.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterReactiveComponent implements OnInit {

  pwdPattern = "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$";
  eGender = Gender;
  controlErrors$: Array<[string, Observable<string>]>;
  userNameError$: Observable<string>;
  firstNameError$: Observable<string>;
  lastNameError$: Observable<string>;
  genderError$: Observable<string>;
  emailError$: Observable<string>;
  confirmPasswordError$: Observable<string>;
  passwordError$: Observable<string>;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private formValidationService: FormValidationService, private el: ElementRef) {
  }

  profileForm = this.fb.group({
    userNameControl: this.fb.control("", [Validators.required,  Validators.minLength(6)]),
    firstNameControl: this.fb.control("", Validators.required),
    lastNameControl: this.fb.control("", Validators.required),
    genderControl: this.fb.control("", Validators.required),
    emailControl: this.fb.control("", [Validators.required, Validators.email]),
    addressControl: this.fb.array([this.createAddressControl()]),
    passwordGroup: this.fb.group({
      passwordControl: this.fb.control(""),
      confirmPasswordControl: this.fb.control("")
    },
      {
        validator: ConfirmPasswordValidator('passwordControl', 'confirmPasswordControl')
      })
  });

  createAddressControl(): FormGroup {
    return this.fb.group({
      lineOneControl: this.fb.control("City, state, etc"),
      lineTwoControl: this.fb.control("")
    });
  }

  addAddress() {
    this.addressControl.push(this.createAddressControl());
  }

  ngOnInit() {
    this.userNameError$ = merge(
      this.formValidationService.error$(this.userNameControl),
      this.formValidationService.asyncError$(this.userNameControl)
    );

    this.firstNameError$ = merge(
      this.formValidationService.error$(this.firstNameControl),
      this.formValidationService.asyncError$(this.firstNameControl)
    );

    this.lastNameError$ = merge(
      this.formValidationService.error$(this.lastNameControl),
      this.formValidationService.asyncError$(this.lastNameControl)
    );

    this.genderError$ = merge(
      this.formValidationService.error$(this.genderControl),
      this.formValidationService.asyncError$(this.genderControl)
    );

    this.genderError$ = merge(
      this.formValidationService.error$(this.genderControl),
      this.formValidationService.asyncError$(this.genderControl)
    );

    this.emailError$ = merge(
      this.formValidationService.error$(this.emailControl),
      this.formValidationService.asyncError$(this.emailControl)
    );

    this.passwordError$ = merge(
      this.formValidationService.error$(this.passwordControl),
      this.formValidationService.asyncError$(this.passwordControl)
    );

    this.confirmPasswordError$ = merge(
      this.formValidationService.error$(this.confirmPasswordControl),
      this.formValidationService.asyncError$(this.confirmPasswordControl)
    );
  };

  get userNameControl(): FormControl {
    return this.profileForm.get("userNameControl") as FormControl;
  }

  get firstNameControl(): FormControl {
    return this.profileForm.get("firstNameControl") as FormControl;
  }

  get lastNameControl(): FormControl {
    return this.profileForm.get("lastNameControl") as FormControl;
  }

  get genderControl(): FormControl {
    return this.profileForm.get("genderControl") as FormControl;
  }

  get emailControl(): FormControl {
    return this.profileForm.get("emailControl") as FormControl;
  }

  get addressControl(): FormArray {
    return this.profileForm.get("addressControl") as FormArray;
  }

  get lineOneControl(): FormControl {
    return this.profileForm.get("lineOneControl") as FormControl;
  }

  get lineTwoControl(): FormControl {
    return this.profileForm.get("lineTwoControl") as FormControl;
  }

  get passwordControl(): FormControl {
    return this.profileForm.get(["passwordGroup", "passwordControl"]) as FormControl;
  }

  get confirmPasswordControl(): FormControl {
    return this.profileForm.get(["passwordGroup", "confirmPasswordControl"]) as FormControl;
  }

  public checkForm(): Boolean {
    for (const key of Object.keys(this.profileForm.controls)) {
      if (this.profileForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        invalidControl.focus();
        return false;
      }
    }

    return true;
  }


  public submit() {
    let formIsPassing = this.checkForm();

    if (!formIsPassing) {
      return;
    }

    var model: RegisterUser = {
      userName: this.userNameControl.value,
      email: this.emailControl.value,
      gender: this.genderControl.value,
      firstName: this.firstNameControl.value,
      lastName: this.lastNameControl.value,
      password: this.passwordControl.value,
      confirmPassword: '',
      addresses: this.addressControl.value
    };

    this.authService.testRequest(model).subscribe(val => this.processPostBack(val), (err => { console.log(err) }))
  }

  private processPostBack(value: any) {
    this.router.navigate(['/']);
  }

}
