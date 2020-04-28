import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookingService } from '../booking.service';
import { UserService } from 'src/app/user/user.service';

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

  constructor(private bookingService: BookingService, private userService: UserService) { }

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

    this.bookingService.addNewBooking(data)
    .subscribe(response => {
      if (!response.error) {
        this.userService.toastSuccess(response.message);
        this.allBookings.push(response.data);
      }
    }, error => {
      this.userService.toastSuccess(error.error.message);
      console.log(error);
    });
  }


  myBookings() {
    this.bookingService.getAllBookings()
    .subscribe(response => {
      if (!response.error) {
        this.userService.toastSuccess(response.message);

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
      this.userService.toastSuccess(error.error.message);
      console.log(error.error);
    });
  }

  keyPress(event) {
    let k;
    k = event.charCode;
    return ((k >= 48 && k <= 57) || k === 46);
  }

}
