import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  GoogleMaps, GoogleMap, GoogleMapsEvent, ILatLng, Encoding, Polygon
} from '@ionic-native/google-maps';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the EncodePathPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-encode-path',
  templateUrl: 'encode-path.html',
})
export class EncodePathPage {
  map: GoogleMap;

  constructor(private alertCtrl: AlertController) {}

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    let GORYOKAKU_POINTS: ILatLng[] = [
      {"lat": 41.79883, "lng": 140.75675},
      {"lat": 41.799240000000005, "lng": 140.75875000000002},
      {"lat": 41.797650000000004, "lng": 140.75905},
      {"lat": 41.79637, "lng": 140.76018000000002},
      {"lat": 41.79567, "lng": 140.75845},
      {"lat": 41.794470000000004, "lng": 140.75714000000002},
      {"lat": 41.795010000000005, "lng": 140.75611},
      {"lat": 41.79477000000001, "lng": 140.75484},
      {"lat": 41.79576, "lng": 140.75475},
      {"lat": 41.796150000000004, "lng": 140.75364000000002},
      {"lat": 41.79744, "lng": 140.75454000000002},
      {"lat": 41.79909000000001, "lng": 140.75465},
      {"lat": 41.79883, "lng": 140.75673}
    ];

    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: GORYOKAKU_POINTS
      }
    });

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {

      let encodedPath: string = Encoding.encodePath(GORYOKAKU_POINTS);
      let alert = this.alertCtrl.create({
        title: 'Encoded path',
        subTitle: encodedPath,
        buttons: ['OK']
      });

      this.map.addPolygon({
        points: GORYOKAKU_POINTS,
        clickable: true
      }).then((polygon: Polygon) => {

        polygon.on(GoogleMapsEvent.POLYGON_CLICK).subscribe(() => {
          alert.present();
        });
      });

    });
  }

}
