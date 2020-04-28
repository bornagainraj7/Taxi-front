import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseData } from '../user/responseData.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private baseUrl = 'http://localhost:3000/api/booking';

  constructor(private http: HttpClient) { }

  addNewBooking(data) {
    return this.http.post<ResponseData>(`${this.baseUrl}/new`, data);
  }

  getAllBookings() {
    return this.http.get<ResponseData>(`${this.baseUrl}/getAll`);
  }
}
