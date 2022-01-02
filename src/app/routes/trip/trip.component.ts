import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Trip } from 'src/app/interfaces/trip';
import { TripService } from 'src/app/service/trip.service';

@Component({
  selector: 'route-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {


  public trip: Trip = { id: 0, idVehicle: { id: 1 } };

  constructor(private tripService: TripService, private dialogo: MatDialogRef<TripComponent>) { }

  ngOnInit(): void {
  }

  location() {
    return new Promise((resolve, reject) => {
      window.navigator.geolocation.getCurrentPosition((c) => {
        if (c != null && c.coords != null) {
          resolve(c.coords);
        }
      });
    })
  }


  aceppted() {
    this.tripService.findById(this.trip).subscribe((tripResult: Trip) => {
      if (tripResult != null && tripResult.id > 0) {
        this.location().then((coors) => {
          this.dialogo.close({trip:tripResult, coors});
        })

      }
    });
  }
}
