import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReferralGuide } from 'src/app/interfaces/referral-guide';

import 'ol/ol.css';
import Feature from 'ol/Feature';
import Geolocation from 'ol/Geolocation';
import Map from 'ol/Map';
import Point from 'ol/geom/Point';
import View from 'ol/View';
import { Circle as CircleStyle, Fill, Stroke, Style, Icon } from 'ol/style';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { fromLonLat, transform } from 'ol/proj';
import { Vector, } from 'ol/source';
import { ReferralGuideService } from 'src/app/service/referral-guide.service';

import Polyline from 'ol/format/Polyline';
import { Routes } from 'src/app/interfaces/routes';

@Component({
  selector: 'app-referral-guide',
  templateUrl: './referral-guide.component.html',
  styleUrls: ['./referral-guide.component.css']
})
export class ReferralGuideComponent implements OnInit, OnDestroy {

  map: Map | undefined;

  referralGuide: ReferralGuide = { id: 0, idTrip: { id: 0, idVehicle: { id: 0 } } };

  constructor(private referralGuideService: ReferralGuideService) { }
  ngOnDestroy() {

  }
  ngOnInit(): void {
  }

  search() {
    this.referralGuideService.findReferenceGuide(this.referralGuide).subscribe((referralGuide) => {
      this.referralGuide = referralGuide;
      this.location().then((corrs: any) => {
        this.initMap(corrs.latitude, corrs.longitude, referralGuide);
      });

    });
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

  initMap(latitude: number, longitude: number, referralGuide: ReferralGuide) {
    var points: any = [],
      msg_el = document.getElementById('msg'),
      url_osrm_nearest = '//router.project-osrm.org/nearest/v1/driving/',
      url_osrm_route = '//router.project-osrm.org/route/v1/driving/',
      icon_url = '//cdn.rawgit.com/openlayers/ol3/master/examples/data/icon.png',
      vectorSource = new Vector(),
      vectorLayer = new VectorLayer({
        source: vectorSource
      }),
      styles = {
        route: new Style({
          stroke: new Stroke({
            width: 6, color: [40, 40, 40, 0.8]
          })
        }),
        icon: new Style({
          image: new Icon({
            anchor: [0.5, 1],
            src: icon_url
          })
        })
      };
    var map = new Map({
      target: 'search-map',
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        vectorLayer
      ],
      view: new View({
        center: fromLonLat([longitude, latitude]),
        zoom: 11
      })
    });
    let flagLayer = new VectorLayer({
      source: new VectorSource()
    });

    map.addLayer(flagLayer);
    // agregar características en un bucle
    let features: Feature[] = [];
    
    referralGuide.idTrip.routeCollection?.forEach((v: Routes, i) => {
      // Crear función
      let feature = new Feature({
        geometry: new Point([v.longitud, v.latitude])
      });
      // Pon la identificacion
      feature.setId(i + "xx");
      //feature.setStyle(this.getIcon());
      features.push(feature);

    });
    // Agregar características en lote
    flagLayer.getSource().addFeatures(features);
    /*
        map.on('click', function (evt) {
    
          utils.getNearest(evt.coordinate).then(function (coord_street: any) {
            console.log(coord_street);
                var last_point = points[points.length - 1];
                points.push(coord_street);
            
                utils.createFeature(coord_street);
            
            
                //get the route
                if(last_point && last_point.join) 
                var point1 = last_point.join();
                if(coord_street && coord_street.join) 
                var point2 = coord_street.join();
                
                fetch(url_osrm_route + point1 + ';' + point2).then(function(r) { 
                  return r.json();
                }).then(function(json) {
            console.log(json.routes[0].geometry)
                  utils.createRoute(json.routes[0].geometry);
                });
          });
        });
    */
    var utils = {
      getNearest: function (coord: any) {
        var coord4326 = utils.to4326(coord);
        return new Promise(function (resolve, reject) {
          //make sure the coord is on street
          fetch(url_osrm_nearest + coord4326.join()).then(function (response) {
            // Convert to JSON
            return response.json();
          }).then(function (json) {
            if (json.code === 'Ok') resolve(json.waypoints[0].location);
            else reject();
          });
        });
      },
      createFeature: function (coord: any) {
        var feature = new Feature({
          type: 'place',
          geometry: new Point(fromLonLat(coord))
        });
        feature.setStyle(styles.icon);
        vectorSource.addFeature(feature);
      },
      createRoute: function (polyline: any) {
        // route is ol.geom.LineString
        var route = new Polyline({
          factor: 1e5
        }).readGeometry(polyline, {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857'
        });
        var feature = new Feature({
          type: 'route',
          geometry: route
        });
        feature.setStyle(styles.route);
        vectorSource.addFeature(feature);
      },
      to4326: function (coord: any) {
        return transform([
          parseFloat(coord[0]), parseFloat(coord[1])
        ], 'EPSG:3857', 'EPSG:4326');
      }
    };
  }

  createMap(view: View) {
    return new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'search-map',
      view: view,
    });
  }

  createView(latitude: number, longitude: number) {
    let view = new View({
      center: fromLonLat([longitude, latitude]),
      zoom: 18,
    });

    return view;
  }

  createGeolocation(view: View) {
    const geolocation = new Geolocation({
      trackingOptions: {
        enableHighAccuracy: true,
        timeout: 5000,
      },
      projection: view.getProjection(),
    });

    return geolocation;
  }

  createFeature() {
    let positionFeature = new Feature();
    positionFeature.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 6,
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
    return positionFeature;
  }

}
