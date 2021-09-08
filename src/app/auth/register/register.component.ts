import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterUser } from 'src/app/shared/registerUser';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

//TODO: Reactive form
//TODO: Add the rest of fields
//TODO: Accessibilty features - optional
//TODO: UNIT TESTS

export class RegisterComponent implements OnInit {
  model: RegisterUser = {
    userName: '',
    email: '',
    gender: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  };

  submitted = false;


  constructor(private router: Router) {
  }


  ngOnInit(): void {

  }

  processPostBack(value: any) {
    console.log(value);
    this.router.navigate(['/']);
  }

  error() {

  }

  async onSubmit() {
    this.submitted = true;
    console.log(this.model);

    this.testRequest(this.model).subscribe(val => this.processPostBack(val), (err => {console.log(err)}))

  }

  public testRequest(model: RegisterUser): Observable<RegisterUser> {
    const response = model;

    let obs = new Observable<RegisterUser>((subscriber) => {
      setTimeout(() => {
        if (model.userName == '1') {
          subscriber.next(response);
        } else {
          subscriber.error('oops');
        }
        subscriber.complete();
      }, 1000);
    });
    return obs;
  }

}
