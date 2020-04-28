import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public isDriver;


  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      return;
    }

    if (form.value.isDriver) {
      this.isDriver = form.value.isDriver;
    } else {
      this.isDriver = false;
    }
    this.userService.createUser(
      { fullName: form.value.fullName,
        email: form.value.email,
        password: form.value.password,
        isDriver: this.isDriver });
    form.resetForm();
  }

}
