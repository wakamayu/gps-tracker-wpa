import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { VehicleService } from '../../service/vehicle.service';
@Component({
  selector: 'vehicle-main',
  templateUrl: './vehicle.main.component.html',
  styleUrls: ['./vehicle.main.component.css']
})
export class VehicleMainComponent implements OnInit {

  vehicleList: Vehicle[] = [];

  constructor(private vehicleService: VehicleService) { }


  ngOnInit(): void {
    this.vehicleService.allVehicle().subscribe((vehicleList) => {
      this.vehicleList = vehicleList;
    })
  }

}
