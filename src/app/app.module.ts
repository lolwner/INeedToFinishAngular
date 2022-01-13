import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { FocusInvalidInputDirective } from './shared/directives/focus-invalid-input.directive';
import { AuthInterceptor } from './core/services/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    FocusInvalidInputDirective
  ],
  imports: [
    BrowserModule,
    AuthModule,
    HttpClientModule,
    CoreModule,
    AppRoutingModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
