import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    url = environment.api;
    headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    constructor(public http: HttpClient) {
    }

    /*===========LOGIN===========*/
    login(data) {
        console.log(data)
        return this.http.post<any>(this.url + `${data.act}?email=${data.email}&password=${data.password}`,data, {});
    }
    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        localStorage.clear();
    }
}
