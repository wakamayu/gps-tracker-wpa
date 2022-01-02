import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReferralGuide } from 'src/app/interfaces/referral-guide';
import { Trip } from 'src/app/interfaces/trip';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { ReferralGuideService } from 'src/app/service/referral-guide.service';
import { TripService } from 'src/app/service/trip.service';
import { VehicleService } from 'src/app/service/vehicle.service';
import { ReferralGuideComponent } from '../referral-guide/referral-guide.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  tripModel: Trip = {
    id: 0,
    point: "",
    arrivalPoint: "",
    travelDate: new Date(),
    idVehicle: {
      id: 0,
      plateNumber: "",
      capacity: "",
      color: "",
      vehicleBrand: "",
      vehicleModel: ""
    }
  };

  vehicleList: Vehicle[] = [];

  referralGuideList: ReferralGuide[] = [];

  constructor(private route: ActivatedRoute, private tripService: TripService, private vehicleService: VehicleService, private referralGuideService: ReferralGuideService, private dialog: MatDialog) {
    /*
        this.route.paramMap.subscribe((map: any) => {
          console.log(map.params.id);
          if (map != null && map.params != null && map.params.id != null) {
            this.tripService.findById(map.params).subscribe((tripModel: Trip) => {
              this.tripModel = tripModel;
              this.allReferralGuide();
              this.allVehicle();
            });
          } else {
            this.allVehicle();
          }
        });
        */
  }

  updateDate: boolean = true;

  ngOnInit(): void {


    this.route.paramMap.subscribe((map: any) => {
      console.log(map.params.id);
      if (map != null && map.params != null && map.params.id != null) {
        this.tripService.findById(map.params).subscribe((tripModel: Trip) => {
          this.tripModel = tripModel;
          this.updateDate = false;
          this.allReferralGuide();
          this.allVehicle();
        });
      } else {
        this.updateDate = true;
        this.allVehicle();
      }
    });

  }

  allVehicle() {
    this.vehicleService.allVehicle().subscribe((vehicleList) => {
      this.vehicleList = vehicleList;
    });
  }

  allReferralGuide() {
    if (this.tripModel.id > 0) {
      this.referralGuideService.findReferenceGuideByidTrip({ idTrip: this.tripModel.id }).subscribe((referralGuideList) => {
        this.referralGuideList = referralGuideList;
      });
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(ReferralGuideComponent);
    dialogRef.afterClosed().subscribe((referralGuide: ReferralGuide) => {
      console.log(referralGuide);
      if (referralGuide && referralGuide.id > 0) {
        if (this.tripModel.id > 0) {
          referralGuide.idTrip = this.tripModel;
          this.referralGuideService.create(referralGuide).subscribe(() => {
            this.updateDate = false;
            this.allReferralGuide();
            this.allVehicle();
          });
        } else {
          this.tripService.create(this.tripModel).subscribe((tripModel) => {
            referralGuide.idTrip = tripModel;
            this.referralGuideService.create(referralGuide).subscribe(() => {
              this.updateDate = false;
              this.tripModel = tripModel;
              this.allReferralGuide();
              this.allVehicle();
            });
          });
        }

      }
    });
  }
}
