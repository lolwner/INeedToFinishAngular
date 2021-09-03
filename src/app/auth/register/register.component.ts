import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterUser } from 'src/app/shared/registerUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
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
    // RegisterComponent.testRequest(this.model).subscribe({
    //   next(x) { success = true; },
    //   error(err) { console.error('something wrong occurred: ' + err); },
    //   complete() { console.log('done'); }
    // })

    RegisterComponent.testRequest(this.model).subscribe(val => this.processPostBack(val))

  }



  public static testRequest(model: RegisterUser) {
    const response = model;

    let obs = new Observable((subscriber) => {
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
