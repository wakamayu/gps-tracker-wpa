import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/interfaces/trip';
import { TripService } from 'src/app/service/trip.service';
import { TripModule } from '../trip.module';

@Component({
  selector: 'trip-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  tripList: Trip[] = [];

  constructor( private tripService: TripService) { }

  ngOnInit(): void {
   
        this.tripService.allTrip().subscribe((tripList) => {
          this.tripList = tripList;
        });
   
  }



}
