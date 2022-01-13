import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthModel } from '../models/auth.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
    constructor(private localStorageService: LocalStorageService,
                private router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.processRequestWithToken(this.getToken(), req, next);
    }

    private processRequestWithToken(token: string | null, req: HttpRequest<any>, next: HttpHandler) {
        if (!!token) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(req);
        }

        return next.handle(req).pipe(
            catchError(err => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        this.router.navigate(['login']);
                    }
                }
                return EMPTY;
            })
        );
    }

    private getToken(): string {
        const auth = this.localStorageService.getItem('auth');
        if (auth) {
            const authData = JSON.parse(auth) as AuthModel;
            console.log(authData.token);
            return authData.token;
        }
        this.router.navigate(['login']);
        return '';
    }
}
