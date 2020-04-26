import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      form.resetForm();
      return;
    }

    this.userService.login({ email: form.value.email, password: form.value.password });
  }

}
