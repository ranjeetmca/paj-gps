import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { DeviceService } from './services/device.service';
import { UtilService } from './services/util.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  devices = [];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  currentUser;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _navController: NavController,
    private modalController: ModalController,
    private router: Router,
    private utilService: UtilService,
    private deviceService: DeviceService,
    private authService: AuthService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser)
    this.getAllDevice();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString("#ffffff");
      this.splashScreen.hide();
      if (this.currentUser) {
        this._navController.navigateRoot('devices')
      } else {
        this._navController.navigateRoot('/login');
      }
      this.platform.backButton.subscribeWithPriority(999, async () => {
        if (this.modalController.getTop()) {
          const modal = await this.modalController.getTop();
          if (modal) {
            this.modalController.dismiss();
            return;
          } else {
            if (this.router.url == "devices") {
              navigator['app'].exitApp();
            } else {
              this._navController.pop();
            }
          }
        } else {
          if (this.router.url == "devices") {
            navigator['app'].exitApp();
          } else {
            this._navController.pop();
          }
        }
      });

    });
  }

  async getAllDevice() {
    await this.deviceService.listAllDevice({ act: 'device' }).subscribe((data: any) => {
      console.log(data)
      if (data.success) {
        this.devices = data.success;
      }
      error => {
        this.utilService.error(JSON.stringify(error.error.error))
      }
    });
  }
  
  async devicePosition(device) {
    console.log(device)
    this._navController.navigateForward('devices', {state:{device}})
    // this.router.navigate(['devices', {skipLocationChange: true, device:device}]);
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/login');
}
}
