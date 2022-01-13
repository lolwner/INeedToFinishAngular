import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegisterUser } from 'src/app/shared/registerUser';
import { UsernameResponse } from 'src/app/shared/usernameResponse';
import { HttpClient } from '@angular/common/http';
import { concatMap, tap } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import { SignInModel } from '../models/sign-in.model';
import { AuthModel } from '../models/auth.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly StorageAuthKey = 'auth';
    private readonly userState = new BehaviorSubject<RegisterUser | null>(null);

    constructor(private router: Router, private http: HttpClient, private localStorageService: LocalStorageService) {
    }

    // testUrl = 'https://localhost:7164/WeatherForecast';

    public testRequest(model: RegisterUser): Observable<RegisterUser> {
        const response = model;

        var model2: SignInModel = {
            email: 'test@mail.com',
            password: 'Top.ptf05'
        };
        this.authenticate(model2).subscribe();
        // var a = this.http.get(this.testUrl).subscribe((data) => console.log(data));
        
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

    public async checkUsernameIsValidAsync(input): Promise<UsernameResponse> {
        return null;
    }

    authenticate(model: SignInModel): Observable<any> {
        return this.http.post<AuthModel>('https://localhost:7164/Account/login', model).pipe(
            tap(x => this.localStorageService.setItem(this.StorageAuthKey, JSON.stringify(x))),
            concatMap(() => this.getApiUser()),
            tap(() => this.router.navigate(['/'])));
    }

    private getApiUser(): Observable<RegisterUser> {
        return this.http.get<RegisterUser>('https://localhost:7164/Account/test').pipe(tap(x => this.userState.next(x)));
    }


}
