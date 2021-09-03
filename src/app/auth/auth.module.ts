import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from './auth.routing-module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RegisterComponent, AuthRoutingModule.components
  ],
  imports: [
    CommonModule, AuthRoutingModule, FormsModule
  ]
})
export class AuthModule { }
