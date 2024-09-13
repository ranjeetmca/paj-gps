import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as maplibregl from 'maplibre-gl';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DevicesService } from '../../services/devices.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ModalController, NavParams } from '@ionic/angular';
@Component({
  selector: 'app-device-tracking',
  templateUrl: './device-tracking.component.html',
  styleUrls: ['./device-tracking.component.scss'],
})
export class DeviceTrackingComponent implements OnInit {
  map: maplibregl.Map | any;
  trakingData: any;
  deviceId: any;
  marker: maplibregl.Marker | any;

  lastCoordinates: { lat: number; lng: number }[] = [];

  constructor(
    private geolocation: Geolocation,
    private deviceService: DevicesService,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private navParams: NavParams,
    private modalController: ModalController
  ) {}

  ngOnInit(): void {
    // Access query parameters via subscription
    // this.deviceId = this.route.snapshot.paramMap.get('id');
    this.deviceId = this.navParams.get('id');
    console.log(this.deviceId);
    this.loadMap();
    this.deviceTracking();
  }
  loadMap() {
    this.map = new maplibregl.Map({
      container: 'map',
      style:
        'https://api.maptiler.com/maps/streets-v2/style.json?key=ozvMjxrTgculRfRfYlwd	', // Map style
      center: [0, 0], // Initial center [longitude, latitude]
      zoom: 3,
    });
  }

  async deviceTracking() {
    this.showLoading();
    this.loadMap();
    await this.deviceService.deviceTracking(this.deviceId).subscribe((res) => {
      this.lastCoordinates = res.success;
      // Add markers for the last tracking data points
      this.lastCoordinates.forEach((coord) => {
        // console.log(coord);
        // this.map.setCenter([coord.lng, coord.lat]);
        // this.map.setZoom(10); // Zoom in closer to the location

        // Add marker at the user's current location
        this.marker = new maplibregl.Marker()
          .setLngLat([coord.lng, coord.lat])
          .addTo(this.map);
        setTimeout(() => {
          this.map.flyTo({
            center: [coord.lng, coord.lat],
            zoom: 7, // Adjust zoom level as needed
            speed: 1.2, // Fly animation speed
            curve: 1, // Animation curve
            duration: 3000,
            essential: true, // This animation is considered essential with respect to user preferences
          });
        }, 500);
      });
    });
  }
  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000, // Automatically dismiss after 2 seconds
      spinner: 'crescent', // Optional spinner type
    });

    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  handleBackButton() {
    this.modalController.dismiss().catch(() => {
      // Handle case where modal might not exist
    });
  }
  ngOnDestroy() {
    this.map?.remove();
  }
}
