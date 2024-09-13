import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { DeviceTrackingComponent } from './devices/device-tracking/device-tracking.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./auth/login/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/login/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'devices',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./devices/devices.module').then((m) => m.DevicesPageModule),
  },
  {
    path: 'device-tracking',
    component: DeviceTrackingComponent,
  },
  {
    path: '',
    redirectTo: 'devices',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
