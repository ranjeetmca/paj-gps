import { Component, OnInit } from '@angular/core';
import { DevicesService } from '../services/devices.service';
import { ModalController } from '@ionic/angular';
import { LoadingService } from '../services/loading.service';
import { DeviceTrackingComponent } from './device-tracking/device-tracking.component';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.page.html',
  styleUrls: ['./devices.page.scss'],
})
export class DevicesPage implements OnInit {
  deviceList: any;
  constructor(
    private deviceService: DevicesService,
    private modalController: ModalController,
    private loadingService: LoadingService
  ) {
    console.log('hello')
  }

  ngOnInit() {
    this.getDevice();
    console.log('hello')
  }
  async getDevice() {
    this.loadingService.showLoading();
    await this.deviceService.getDevices().subscribe({
      // Navigate to home page after successful login
      next: (res) => (this.deviceList = res.success),
      error: (err) => console.log(err.error.error),
    });
  }
  doRefresh(event: any) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      // Here you can refresh your data
      this.getDevice();
      // Stop the refresher after async operation
      event.target.complete();
    }, 2000);
  }
  async goToDevice(id: string) {
    console.log(id);
    const modal = await this.modalController.create({
      component: DeviceTrackingComponent,
      componentProps: {
        id: id, // Passing the id to the modal
      },
    });
    return await modal.present();
  }
}
