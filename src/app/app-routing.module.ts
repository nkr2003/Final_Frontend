import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { PaymentsComponent } from './userdashboard/payments/payments.component';
import { CartComponent } from './userdashboard/cart/cart.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';


const routes: Routes = [
  { path: '', component: HomeComponent },   // default route (homepage)
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin-dashboard', component: AdmindashboardComponent },
  { path: 'user-dashboard', component: UserdashboardComponent },
  { path: 'payments', component: PaymentsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'payment-success', component: PaymentSuccessComponent },


  // catch-all route
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
