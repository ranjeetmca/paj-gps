import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { DevicesService } from './services/devices.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public selectedIndex = 0;
  Users: any;
  public appPages = [
    { title: 'All Devices', url: '/tabs/devices', icon: 'map' },
  ];
  constructor(private authService: AuthenticationService
    ) {
    const storedUser = localStorage.getItem('user');
    this.Users = storedUser ? JSON.parse(storedUser) : null;
    console.log(this.Users)
  }
  async logout() {
    this.authService.logout();
  }
  ngOnInit() {

  }

}
