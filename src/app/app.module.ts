import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { FocusInvalidInputDirective } from './shared/directives/focus-invalid-input.directive';

@NgModule({
  declarations: [
    AppComponent,
    FocusInvalidInputDirective
  ],
  imports: [
    BrowserModule, 
    AuthModule,
    CoreModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
