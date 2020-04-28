import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CabService } from '../cab.service';
import { from } from 'rxjs';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-cabs',
  templateUrl: './cabs.component.html',
  styleUrls: ['./cabs.component.css']
})
export class CabsComponent implements OnInit {

  cabTypes = [
    { type: 1, value: 'Normal' },
    { type: 2, value: 'Pink' }
  ];


  cabList = [];

  constructor(private cabService: CabService, private userService: UserService) { }

  ngOnInit() {
    this.getAllCabs();
  }

  onAddCab(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const cabData = {
      cabType: form.value.cabType,
      vehicleNumber: form.value.registration,
      carModel: form.value.model,
      carBrand: form.value.brand,
      available: true,
      currentLocation: {
        latlng: {
          type: 'Point',
          coordinates: [form.value.lat, form.value.lng],
        },
      },
    };

    this.cabService.addcab(cabData)
    .subscribe(response => {
      if (!response.error) {
        const newCab = response.data;
        this.cabList.push(newCab);

        this.userService.toastSuccess(response.message);
      }
    }, error => {
      this.userService.toastError(error.error.message);
      console.log(error.error);
    });
  }

  getAllCabs() {
    this.cabService.getAllCabs()
    .subscribe(response => {
      if (!response.error) {
        this.userService.toastSuccess(response.message);

        this.cabList = response.data.map(cab => {
          return {
            _id: cab._id,
            cabType: cab.cabType === 1 ? 'Normal' : 'Pink',
            available: cab.available ? 'Available' : 'Unavailable',
            carBrand: cab.carBrand,
            carModel: cab.carModel,
            currentLocation: cab.currentLocation,
            driverId: cab.driverId,
            vehicleNumber: cab.vehicleNumber
          };
        });
      }
    }, error => {
      this.userService.toastError(error.error.message);
      console.log(error.error);
    });
  };

  keyPress(event) {
    let k;
    k = event.charCode;
    return ((k >= 48 && k <= 57) || k === 46);
  }

}
