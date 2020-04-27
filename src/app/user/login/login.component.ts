import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {

  private authStatusSubs: Subscription;
  isAuthenticated;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.autoAuthUser();
    this.isAuthenticated = this.userService.getIsAuth();
    this.authStatusSubs = this.userService.getAuthStatusListener()
    .subscribe(auth => {
      this.isAuthenticated = auth;
    });
    if (this.isAuthenticated) {
      this.router.navigate(['bookings']);
    }
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      form.resetForm();
      return;
    }

    this.userService.login({ email: form.value.email, password: form.value.password });
  }

  ngOnDestroy() {
    this.authStatusSubs.unsubscribe();
  }

}
