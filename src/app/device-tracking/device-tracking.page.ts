import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as maplibregl from 'maplibre-gl';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DevicesService } from '../services/devices.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-device-tracking',
  templateUrl: './device-tracking.page.html',
  styleUrls: ['./device-tracking.page.scss'],
})
export class DeviceTrackingPage implements AfterViewInit {
  map: maplibregl.Map | any;
  trakingData: any;
  deviceId: any;
  marker: maplibregl.Marker | any;

  lastCoordinates: { lat: number; lng: number }[] = [];

  constructor(
    private geolocation: Geolocation,
    private deviceService: DevicesService,
    private route: ActivatedRoute
  ) {}

  ngAfterViewInit(): void {
    // Access query parameters via subscription
    this.deviceId = this.route.snapshot.paramMap.get('id');
    this.deviceTracking();
    // setTimeout(() => {
    //   this.loadMap();

    // }, 200);
  }

  loadMap() {
    this.map = new maplibregl.Map({
      container: 'map',
      style: 'https://demotiles.maplibre.org/style.json', // Example style
      zoom: 4,
    });

    // Add markers for the last tracking data points
    this.lastCoordinates.forEach((coord) => {
      // console.log(coord);
      const marker = new maplibregl.Marker()
        .setLngLat([coord.lng, coord.lat])
        .addTo(this.map);
    });
  }
  async deviceTracking() {
    await this.deviceService.deviceTracking(this.deviceId).subscribe((res) => {
      this.lastCoordinates = res.success;
      // console.log(this.lastCoordinates[0].lat);
      this.map = new maplibregl.Map({
        container: 'map',
        style: 'https://demotiles.maplibre.org/style.json', // Example style
        center: [0, 0], // Starting point
        zoom: 4,
      });

      // Add markers for the last tracking data points
      this.lastCoordinates.forEach((coord) => {
        // console.log(coord);
        this.map.setCenter([coord.lng, coord.lat]);
        this.map.setZoom(2); // Zoom in closer to the location

        // Add marker at the user's current location
        this.marker = new maplibregl.Marker()
          .setLngLat([coord.lng, coord.lat])
          .addTo(this.map);
      });
      //   const marker = new maplibregl.Marker()
      //     .setLngLat([coord.lng, coord.lat])
      //     .addTo(this.map);
      // });
    });
  }
}
