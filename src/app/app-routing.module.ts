import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { UserDashboardComponent } from './userdashboard/userdashboard.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { VendorComponent } from './vendor/vendor.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {path:'login',component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'admin-dashboard', component: AdmindashboardComponent },
  { path: 'user-dashboard', component: UserDashboardComponent},
  { path: 'vendors/:id', component: VendorComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
