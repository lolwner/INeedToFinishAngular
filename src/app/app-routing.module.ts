import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';

const app_routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: '/register' },
  { path: 'register', component: RegisterComponent }
  //   { path: 'customers/:id', data: { preload: true }, loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) },
  //   { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) },
  //   { path: 'orders', data: { preload: true }, loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) },
  //   { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
  // { path: '**', pathMatch: 'full', redirectTo: '/register' } // catch any unfound routes and redirect to home page


];

@NgModule({
  imports: [RouterModule.forRoot(app_routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }