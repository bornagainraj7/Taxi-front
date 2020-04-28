import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseData } from './responseData.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public baseUrl = 'http://localhost:3000/api/user';

  private token;
  private authStatusList = new Subject<boolean>();

  private isAuthenticated = false;

  private tokenTimer: any;

  private userData;

  private userId: string;
  private email: string;
  private name: string;
  private isDriver: boolean;


  constructor(private http: HttpClient, private router: Router, private toast: ToastrService) { }

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusList.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getIsDriver() {
    return this.isDriver;
  }

  toastSuccess(message) {
    console.log('toast success');
    this.toast.success(message, 'Success');
  }

  toastError(message) {
    this.toast.error(message, 'Error');
  }


  private saveAuthData(expiration: Date) {
    localStorage.setItem('token', this.token);
    localStorage.setItem('name', this.name);
    localStorage.setItem('userId', this.userId);
    localStorage.setItem('email', this.email);
    localStorage.setItem('driver', this.isDriver.toString());
    localStorage.setItem('expiration', expiration.toISOString());
  }


  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('driver');
  }

  private setAuthTimer(duration) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }


  getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    const email = localStorage.getItem('email');
    const name = localStorage.getItem('name');
    const driver = localStorage.getItem('driver');
    let isDriver: boolean;

    if (driver == 'true') {
      isDriver = true;
    } else {
      isDriver = false;
    }

    const userData = { token, expirationDate: new Date(expirationDate), userId, email, name };
    this.userData = userData;
    if (token || !expirationDate) {
      return;
    }
    return userData;
  }


  autoAuthUser() {
    this.getAuthData();
    const authInfo = this.userData;
    if (!authInfo) {
      return;
    }
    const expiresIn = authInfo.expirationDate.getTime() - Date.now();
    if (expiresIn > 60000) {
      this.token = authInfo.token;
      this.isAuthenticated = true;
      this.authStatusList.next(true);
      this.userId = authInfo.userId;
      this.name = authInfo.name;
      this.email = authInfo.email;
      this.setAuthTimer(expiresIn / 1000);
    }

  }


  createUser(userData) {
    console.log(userData);
    this.http.post<ResponseData>(`${this.baseUrl}/signup`, userData)
    .subscribe((response) => {
      if (!response.error) {
        this.toastSuccess(response.message);
        this.router.navigate(['/login']);
      }
      console.log(response);
    }, (error) => {
      this.toastError(error.error.message);
      console.log(error.error);
    });
  }

  login(userData) {
    this.http.post<ResponseData>(`${this.baseUrl}/login`, userData)
    .subscribe(response => {
      this.token = response.data.token;
      if (!response.error) {
        const expiresIn = 86400;
        this.setAuthTimer(expiresIn);

        this.isAuthenticated = true;
        this.authStatusList.next(true);

        this.userId = response.data._id;
        this.email = response.data.email;
        this.name = response.data.fullName;
        this.isDriver = response.data.isDriver;

        const expirationDate = new Date(Date.now() + expiresIn * 1000);
        this.saveAuthData(expirationDate);

        console.log('...toast');
        this.toastSuccess(response.message);
        this.router.navigate(['bookings']);
      }
    }, error => {
      this.authStatusList.next(false);
      this.toastError(error.error.message);
      console.log(error.error);
    });
  }


  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusList.next(false);
    this.userId = null;
    this.email = null;
    this.name = null;
    this.isDriver = null;
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
    this.toastSuccess('User Successfully logged out');
    this.router.navigate(['/login']);
  }

}
