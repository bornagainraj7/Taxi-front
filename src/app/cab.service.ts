import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseData } from './user/responseData.model';

@Injectable({
  providedIn: 'root'
})
export class CabService {

  baseUrl = 'http://localhost:3000/api/cab';


  constructor(private http: HttpClient) { }

  addcab(data) {
    return this.http.post<ResponseData>(`${this.baseUrl}/add`, data);
  }

  getAllCabs() {
    return this.http.get<ResponseData>(`${this.baseUrl}/get`);
  }
}
