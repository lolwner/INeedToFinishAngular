import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterUser } from 'src/app/shared/registerUser';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private router: Router) {
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
