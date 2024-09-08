import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';


const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      // {
      //   path: 'home',
      //   loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      // },
      {
        path: 'devices',
        loadChildren: () => import('../devices/devices.module').then(m => m.DevicesPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'device-tracking/:id',
        loadChildren: () => import('../device-tracking/device-tracking.module').then(m => m.DeviceTrackingPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
