import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPageModule } from './tabs/tabs.module';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./auth/login/auth.module').then(m => m.AuthModule)
  },
  // {
  //   path: '',
  //   redirectTo: 'tabs',
  //   pathMatch: 'full'
  // },
  {
    path: 'tabs',
    canActivate: [AuthGuard],
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'device-tracking',
    loadChildren: () => import('./device-tracking/device-tracking.module').then( m => m.DeviceTrackingPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
