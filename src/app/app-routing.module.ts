import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';

const app_routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/register' },
  { path: 'register', component: RegisterComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/register' } // catch any unfound routes and redirect to home page


];

@NgModule({
  imports: [RouterModule.forRoot(app_routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }