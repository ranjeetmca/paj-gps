import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  url = environment.api;
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(public http: HttpClient) {
  }

  /*===========All Devices===========*/
  listAllDevice(data) {
    console.log(data)
    return this.http.get(this.url + `${data.act}`, {});
  }

  /*===========Last position of all devices===========*/
  lastPoistionAllDevices(data) {
    console.log(data)
    https://connect.paj-gps.de/api/trackerdata/98/last_points?lastPoints=30

    return this.http.get(this.url + `${data.act}/${data.DeviceID}/${data.act1}?lastPoints=${data.lastPoints}`, {});
  }
}
