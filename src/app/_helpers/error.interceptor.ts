import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService,
        public navCtrl: NavController) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.error.phone_number) {
                err.statusText = err.error.phone_number[0];
            }
            if (err.error.hasOwnProperty('is_created')) {
                err.statusText = err.error.is_created;
            }           
            const error = err.statusText || err.error.detail || err.error.message;
            return throwError(error);
        }))
    }
}