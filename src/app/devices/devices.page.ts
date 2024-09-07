import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../services/device.service';
import { UtilService } from '../services/util.service';
import { Map, tileLayer, marker, icon } from 'leaflet';
import { google } from 'google-maps';
import { ActivatedRoute, Router } from '@angular/router';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';
@Component({
  selector: 'app-devices',
  templateUrl: './devices.page.html',
  styleUrls: ['./devices.page.scss'],
})
export class DevicesPage implements OnInit {
  map: Leaflet.Map;
  // map: google;
  latitude: any;
  longitude: any;
  constructor(private deviceService: DeviceService,
    private route: ActivatedRoute, private router: Router,
    private utilService: UtilService) {
      this.route.queryParams.subscribe(params => {
        console.log(params);
        if (params && params.device) {
         console.log(JSON.parse(params.device))
          this.leafletMap(JSON.parse(params.device))
        }
      });
     }

  ngOnInit() {
    this.getAllDevice();
  }
  ionViewDidEnter() { this.leafletMap(''); }
  leafletMap(data) {
    var container = Leaflet.DomUtil.get('mapId');
      if(container != null){
        container._leaflet_id = null;
      }
    console.log(data)
    if (data.length > 0) {
      this.map = Leaflet.map('mapId').setView([data[0].lat, data[0].lng], 14);
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'edupala.com © Angular LeafLet',
      }).addTo(this.map);
      data.forEach(element => {
        console.log(element)
        Leaflet.marker([element.lat, element.lng]).addTo(this.map);
        const unixTime = element.dateunix;
const date = new Date(unixTime*1000);
// let popData = {
  let  dt = date.toLocaleDateString("en-us");
 let Battery = element.battery;
// }
        Leaflet.marker([element.lat, element.lng]).addTo(this.map).bindPopup('Date:' + dt.toString() + '<br>' + 'Battery' + Battery.toString()).openPopup();

    antPath([[element.lat, element.lng]],
      { color: '#FF0000', weight: 5, opacity: 0.6 })
      .addTo(this.map);
      });

    
    }
  }

  /** Remove map when we have multiple map object */
  ngOnDestroy() {
    this.map.remove();
  }

  getAllDevice() {
    this.deviceService.listAllDevice({ act: 'device' }).subscribe((data: any) => {
      console.log(data)
      if (data.success) {
        data.success.forEach(element => {
          let params = {
            DeviceID: element.id,
            act: 'trackerdata',
            act1: 'last_points',
            lastPoints: 30
          }
          this.deviceService.lastPoistionAllDevices(params).subscribe((data1: any) => {
            console.log(JSON.stringify(data1) + 'lat')
            if (data1.success) {
              this.leafletMap(data1.success);
              // data1.success.forEach(element1 => {
              //   if (element1) {
              //     this.leafletMap(element1);
              //   }
              // })
            }
          },
            error => {
              this.utilService.error(JSON.stringify(error.error.error))
            });

        });
      }
    },
      error => {
        this.utilService.error(JSON.stringify(error.error.error))
      });
  }
}
