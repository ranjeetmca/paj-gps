import { Component, OnInit } from '@angular/core';
import { DevicesService } from '../services/devices.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.page.html',
  styleUrls: ['./devices.page.scss'],
})
export class DevicesPage implements OnInit {
  deviceList: any;
  constructor(private deviceService: DevicesService,
    private router: Router
    ) {}

  ngOnInit() {
    this.getDevice();
  }
  async getDevice() {
    await this.deviceService.getDevices().subscribe({
      // Navigate to home page after successful login
      next: (res) => (this.deviceList = res.success),
      error: (err) => console.log(err.error.error),
    });
  }

  goToDevice(id: string) {
    console.log(id)
    this.router.navigate(['tabs/device-tracking', id]);
  }
}
