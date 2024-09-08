import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeviceTrackingPageRoutingModule } from './device-tracking-routing.module';

import { DeviceTrackingPage } from './device-tracking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeviceTrackingPageRoutingModule
  ],
  declarations: [DeviceTrackingPage]
})
export class DeviceTrackingPageModule {}
