
import { Component, OnInit,  ElementRef } from '@angular/core';
//import Map from 'ol/Map';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class RoutesMapComponent implements OnInit {
  //@Input() map!: Map ;

  constructor(private elementRef: ElementRef) {
  }
  ngOnInit() {
    //this.map.setTarget(this.elementRef.nativeElement);
  }
}
