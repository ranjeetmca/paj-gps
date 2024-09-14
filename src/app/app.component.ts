import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { DevicesService } from './services/devices.service';
import { ModalController, Platform } from '@ionic/angular';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoadingService } from './services/loading.service';
import { DeviceTrackingComponent } from './devices/device-tracking/device-tracking.component';

declare var navigator: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public selectedIndex = 0;
  Users: any;
  deviceList: any;
  public appPages = [{ title: 'All Devices', url: '/devices', icon: 'map' }];
  constructor(
    private authService: AuthenticationService,
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private router: Router,
    private location: Location,
    private deviceService: DevicesService,
    private loadingService: LoadingService,
    private modalController: ModalController
  ) {
    const storedUser = localStorage.getItem('user');
    this.Users = storedUser ? JSON.parse(storedUser) : null;
    console.log(this.Users)
    if (this.Users) {
      this.router.navigate(['/devices']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
      this.getDevice();
  }
  
  ionViewDidEnter() {}
  
  initializeApp() {
    this.platform.ready().then(async () => {
      this.splashScreen.hide();
      this.platform.backButton.subscribeWithPriority(9999, () => {
        // Customize your back button action here
        if (this.router.url === '/devices') {
          // If on the home page, you can handle the back button differently
          // navigator['app'].exitApp(); // Close the app on Android
          this.goBack();
        } else {
          // Navigate back in history
          this.router.navigate(['/devices']);
        }
      });
    });
  }
  async getDevice() {
    console.log('okk')
    this.loadingService.showLoading();
    await this.deviceService.getDevices().subscribe({
      next: (res) => (this.deviceList = res.success),
      error: (err) => console.log(err.error.error),
    });
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
  goBack() {
    this.location.back(); // Navigate back
  }
  async logout() {
    this.authService.logout();
  }
}
