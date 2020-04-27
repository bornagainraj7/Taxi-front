import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BookingsComponent } from '../booking/bookings/bookings.component';
import { SignupComponent } from '../user/signup/signup.component';
import { LoginComponent } from '../user/login/login.component';
import { CabsComponent } from '../cabs/cabs.component';
import { RouteGuard } from '../route.guard';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'bookings', component: BookingsComponent, canActivate: [RouteGuard] },
  { path: 'my-cab', component: CabsComponent, canActivate: [RouteGuard] },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [RouteGuard],
  declarations: []
})
export class AppRoutingModule { }
