import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  // auth0NativeConfig,
  // auth0WebConfig,
} from '../../environments/environment';
import { BehaviorSubject, Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService  {
  private apiUrl = environment.apiURL; // Replace with your API URL
  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public user$: Observable<any> = this.userSubject.asObservable();

  constructor(private http: HttpClient,
    private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login?email=${username}&password=${password}`, {})
      .pipe(
        tap(response => {
          console.log(response.success)
          // Store user and token in local storage or a similar place
          localStorage.setItem('token', response.success.token);
          localStorage.setItem('user', JSON.stringify(response.success));
          this.userSubject.next(response.success);
        })
      );
  }
 // Getter to return the userSubject as an Observable
 getUser(): Observable<any> {
  return this.userSubject.asObservable();
}
  logout() {
    // Clear user data and token from storage
    localStorage.removeItem('token');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
    location.reload();

  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
