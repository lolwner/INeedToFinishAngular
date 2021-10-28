import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/core/services/authService';
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterReactiveComponent } from './register-reactive.component';
import { Observable } from 'rxjs';
import { RegisterUser } from 'src/app/shared/registerUser';

class MockAuthService {
  isLoggedIn = true;
  user = { name: 'Test User' };
}

describe('RegisterReactiveComponent', () => {
  let component: RegisterReactiveComponent;
  let fixture: ComponentFixture<RegisterReactiveComponent>;
  let authServiceInjected: AuthService;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('Router', ['getValue']);

    await TestBed.configureTestingModule({
      declarations: [RegisterReactiveComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [{
        provide: AuthService
        // useClass: MockAuthService
      }]
    })
      .compileComponents();

      authServiceInjected = TestBed.inject(AuthService);

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('addAddress should add FormGroup', () => {
    let currentAddressLength = component.addressControl.controls.length;

    component.addAddress();

    expect(component.addressControl.controls.length).toEqual(currentAddressLength + 1);
  });

  it('should create Address FormGroup', () => {
    let testFormGroup = new FormGroup({
      lineOneControl: new FormControl("City, state, etc"),
      lineTwoControl: new FormControl("")
    });

    let componentFormGroup = component.createAddressControl();

    expect(componentFormGroup.controls[0]).toEqual(testFormGroup.controls[0]);
    expect(componentFormGroup.controls[1]).toEqual(testFormGroup.controls[1]);
  });

  it('should submit', () =>{
    
    var model: RegisterUser = {
      userName: component.userNameControl.value,
      email: component.emailControl.value,
      gender: component.genderControl.value,
      firstName: component.firstNameControl.value,
      lastName: component.lastNameControl.value,
      password: component.passwordControl.value,
      confirmPassword: '',
      addresses: component.addressControl.value
    };

    spyOn(component, 'checkForm').and.returnValue(true);
    spyOn(authServiceInjected, 'testRequest').withArgs(model).and.returnValue(new Observable<RegisterUser>());

    component.submit()

    expect(authServiceInjected.testRequest).toHaveBeenCalledWith(model);
  })
});
