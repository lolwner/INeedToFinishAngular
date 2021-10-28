import { fakeAsync, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { RegisterUser } from "src/app/shared/registerUser";
import { AuthService } from "./authService";

describe('AuthService', () => {
    let service: AuthService;

    beforeEach(() => {
        TestBed.configureTestingModule(
            {
                providers: [AuthService],
                imports: [RouterTestingModule]
            });
        service = TestBed.inject(AuthService);
    });

    it('should use ValueService', (done: DoneFn) => {
        let testValue: RegisterUser = {
            userName: '1',
            email: '',
            gender: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
            addresses: '',
        };

        service.testRequest(testValue).subscribe(
            res => {
                expect(res).toBe(testValue);
                done();
            }
        );

    });

    it('should use ValueService2', (done: DoneFn) => {
        let testValue: RegisterUser = {
            userName: '1',
            email: '',
            gender: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
            addresses: '',
        };

        service.testRequest(testValue).subscribe(
            res => {
                
                done();
            },
            (err => {
                expect(err).toBe('oops');
            })
        );

    });
});