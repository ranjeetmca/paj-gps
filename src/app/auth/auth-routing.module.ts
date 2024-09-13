import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    // children: [
    //   {
    //     path: 'login',
    //     loadChildren: () =>
    //       import('../auth/login/auth.module').then((m) => m.AuthModule),
    //   },
    // ],
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
})
export class AuthRoutingModule {}
