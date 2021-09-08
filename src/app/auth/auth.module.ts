import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from './auth.routing-module';
import { FormsModule } from '@angular/forms';
import { RegisterReactiveComponent } from './register-reactive/register-reactive.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RegisterComponent, AuthRoutingModule.components, RegisterReactiveComponent
  ],
  imports: [
    CommonModule, AuthRoutingModule, FormsModule, ReactiveFormsModule
  ]
})
export class AuthModule { }
