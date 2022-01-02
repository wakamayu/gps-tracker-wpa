import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { interval, Observable, Subject, Subscription, timer } from 'rxjs';
import { repeatWhen, startWith, switchMap, takeUntil } from 'rxjs/operators';
import * as $ from 'jquery';

import 'ol/ol.css';
import Feature from 'ol/Feature';
import Geolocation from 'ol/Geolocation';
import Map from 'ol/Map';
import Point from 'ol/geom/Point';
import View from 'ol/View';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { fromLonLat } from 'ol/proj';

import { MatDialog } from '@angular/material/dialog';
import { TripComponent } from '../trip/trip.component';
import { Trip } from 'src/app/interfaces/trip';
import { Routes } from 'src/app/interfaces/routes';
import { RoutesService } from 'src/app/service/routes.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit
  , OnDestroy {

  countMinute: Number = 0;
  coordinates: number[] = [0, 0];

  trip: Trip = { id: 0, idVehicle: { id: 0 } };
  dialogRef = this.dialog.open(TripComponent);
  private static INTERVALSUB = interval(60000);

  private readonly _stop = new Subject<void>();
  private readonly _start = new Subject<void>();

  checkButton: boolean = false;

  //  map: Map | undefined;

  constructor(private routerService: RoutesService, private dialog: MatDialog) {

  }


  ngOnDestroy(): void {
    this.stop();
    this.dialogRef.close();
    this.checkButton = false;
    $("#ol-map").empty();
  }

  openDialog() {

    this.dialogRef.afterClosed().subscribe((modal) => {
      console.log(modal)
      if (modal != null && modal.trip != null && modal.trip.id > 0) {
        this.trip = modal.trip;
        this.initMap(modal.coors.latitude, modal.coors.longitude);
        this.initTimer();
      } else {
        this.openDialog();
      }
    });
  }




  /*
    createFeature() {
      return positionFeature;
    }
  */
  initMap(latitude: number, longitude: number) {
    let _self = this;
    let view = new View({
      center: fromLonLat([longitude, latitude]),
      zoom: 15,
    });


    let map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'ol-map',
      view: view,
    });

    let geolocation = new Geolocation({
      trackingOptions: {
        enableHighAccuracy: true,
        timeout: 5000,
      },
      projection: view.getProjection(),
    });

    geolocation.setTracking(true);

    let positionFeature = new Feature();
    positionFeature.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 4,
          fill: new Fill({
            color: '#3399CC',
          }),
          stroke: new Stroke({
            color: '#fff',
            width: 1,
          }),
        }),
      })
    );

    geolocation.on('change:position', function () {
      let coordinates = geolocation.getPosition();
      if (coordinates) {
        _self.coordinates = coordinates;
        positionFeature.setGeometry(new Point(coordinates));
      }
    });

    let accuracyFeature = new Feature();
    geolocation.on('change:accuracyGeometry', function () {
      accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
    });

    new VectorLayer({
      map: map,
      source: new VectorSource({
        features: [accuracyFeature, positionFeature],
      }),
    });
  }

  ngOnInit(): void {
    this.openDialog();
  }

  async serviceCall(x: number) {
    this.countMinute = x;

    let routes: Routes = {
      longitud: this.coordinates[0],
      latitude: this.coordinates[1],
      idTrip: this.trip,
      id: 0
    };
    if (routes.latitude != 0 && routes.longitud != 0) {
      this.routerService.create(routes).subscribe((route) => {
        console.log(route);
      });
    }
  }

  initTimer() {
    MainComponent.INTERVALSUB.pipe(
      startWith(0),
      switchMap((x) => this.serviceCall(x)),
      takeUntil(this._stop),
      repeatWhen(() => this._start)).subscribe();
  }

  start() {
    this._start.next();

    this.checkButton = false;
  }

  stop() {
    this._stop.next();
    this.checkButton = true;
  }

}
