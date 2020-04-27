import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BookingsComponent } from '../booking/bookings/bookings.component';
import { SignupComponent } from '../user/signup/signup.component';
import { LoginComponent } from '../user/login/login.component';
import { CabsComponent } from '../cabs/cabs.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'bookings', component: BookingsComponent },
  { path: 'my-cab', component: CabsComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  declarations: []
})
export class AppRoutingModule { }
