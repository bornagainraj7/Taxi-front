import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseData } from './responseData.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public baseUrl = 'http://localhost:3000/api/user';

  private token;
  private authStatusList = new Subject<boolean>();

  private isAuthenticated = false;

  private tokenTimer: any;

  private userId: string;
  private email: string;
  private name: string;

  constructor(private http: HttpClient, private router: Router) { }

  createUser(userData) {
    console.log(userData);
    this.http.post<ResponseData>(`${this.baseUrl}/signup`, userData)
    .subscribe((response) => {
      if (!response.error) {
        this.router.navigate(['/login']);
      }
      console.log(response);
    }, (error) => {
      console.log(error.error);;
    });
  }

  login(userData) {
    console.log(userData);
    this.http.post<ResponseData>(`${this.baseUrl}/login`, userData)
    .subscribe(response => {
      this.token = response.data;
      if (!response.error) {
        const expiresIn = 86400;
        this.isAuthenticated = true;

        this.authStatusList.next(true);

        this.userId = response.data._id;
        this.email = response.data.email;
        this.name = response.data.name;

        this.router.navigate(['/bookings']);
      }
    }, error => {
      this.authStatusList.next(false);
      console.log(error.error);;
    });
  }

}
