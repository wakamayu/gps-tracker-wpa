import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { VehicleService } from 'src/app/service/vehicle.service';

@Component({
  selector: 'vehicle-form',
  templateUrl: './vehicle.form.component.html',
  styleUrls: ['./vehicle.form.component.css']
})
export class VehicleFormComponent implements OnInit {

  vehicleModel: Vehicle = {
    id: 0,
    plateNumber: "",
    capacity: "",
    color: "",
    vehicleBrand: "",
    vehicleModel: ""
  };



  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void { }

  save() {
    this.vehicleService.create(this.vehicleModel).subscribe(() => {

    });
  }

  clear() {
    this.vehicleModel = {
      id: 0,
      plateNumber: "",
      capacity: "",
      color: "",
      vehicleBrand: "",
      vehicleModel: ""
    };
  }

}
