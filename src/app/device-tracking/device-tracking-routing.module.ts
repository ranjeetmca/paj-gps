import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeviceTrackingPage } from './device-tracking.page';

const routes: Routes = [
  {
    path: '',
    component: DeviceTrackingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeviceTrackingPageRoutingModule {}
