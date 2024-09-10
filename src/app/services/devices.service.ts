import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  // auth0NativeConfig,
  // auth0WebConfig,
} from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DevicesService  {
  private apiUrl = environment.apiURL; // Replace with your API URL
  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public user$: Observable<any> = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  getDevices(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/device`, {})
      .pipe(
        tap(response => {
          console.log(response)
        })
      );
  }
  deviceTracking(id:any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/trackerdata/${id}/last_points?lastPoints=50`, {})
      .pipe(
        tap(response => {
          console.log(response)
        })
      );
  }

}
