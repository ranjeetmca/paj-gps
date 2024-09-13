import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevicesPage } from './devices.page';
import { DeviceTrackingComponent } from './device-tracking/device-tracking.component';
import { DevicesPageRoutingModule } from './devices-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevicesPageRoutingModule
  ],
  declarations: [DevicesPage, DeviceTrackingComponent],
})
export class DevicesPageModule {}
