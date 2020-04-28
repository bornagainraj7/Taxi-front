import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  cabTypes = [
    { type: 1, value: 'Normal' },
    { type: 2, value: 'Pink' }
  ];

  allBookings = [];

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.myBookings();
  }

  onBooking(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const data = {
      start: {
        coordinates: [parseFloat(form.value.startLat), parseFloat(form.value.startLng)],
      },
      end: {
        coordinates: [parseFloat(form.value.destLat), parseFloat(form.value.destLng)],
      },
      // tslint:disable-next-line: radix
      cabType: parseInt(form.value.cabType),
    };
    // console.log(form.value);

    this.bookingService.addNewBooking(data)
    .subscribe(response => {
      if (!response.error) {
        this.allBookings.push(response.data);
      }
    }, error => {
      console.log(error);
    });
  }


  myBookings() {
    this.bookingService.getAllBookings()
    .subscribe(response => {
      if (!response.error) {
        this.allBookings  = response.data.map(data => {
          return {
            _id: data._id,
            cabId: data.cabId,
            travellerId: data.travellerId,
            price: data.price,
            discountedPrice: data.discountedPrice || null,
            isDiscount: data.isDiscount,
            cabType: data.cabType === 1 ? 'Normal' : 'Pink',
            driverId: data.driverId,
            carBrand: data.carBrand,
            carModel: data.carModel,
            vehicleNumber: data.vehicleNumber,
            distance: data.distance,
            location: data.location,
            createdOn: data.createdOn,
          };
        });
      }
    }, error => {
      console.log(error.error);
    });
  }

}
