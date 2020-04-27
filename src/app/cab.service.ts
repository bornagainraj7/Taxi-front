import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseData } from './user/responseData.model';

@Injectable({
  providedIn: 'root'
})
export class CabService {

  baseUrl = 'http://localhost:3000/api/cab';

  allCabs = [];

  constructor(private http: HttpClient) { }

  addcab(data) {
    return this.http.post<ResponseData>(`${this.baseUrl}/add`, data);
  }

  getAllCabs() {
    this.http.get<ResponseData>(`${this.baseUrl}/get`)
    .subscribe(response => {
      if (!response.error) {
        this.allCabs.push(response.data);
      }
    }, error => {
      console.log(error.error);
    });
  }
}
