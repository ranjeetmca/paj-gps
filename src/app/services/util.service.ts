import { Injectable, Input } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Subject } from 'rxjs/internal/Subject';

@Injectable()
export class UtilService {
    isLoading = false;

    private subject = new Subject<any>();
  
    private keepAfterRouteChange = false;
  
    _loading: any;
    public data: any;
    @Input() public get dataval() {
        return this.data;
    }

    public set dataval(val) {
        this.data = val;
    }
    constructor(public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public loadingController: LoadingController) {
    }
    /*--------API Success Function alert message--------------*/
    async success(message: string) {
        const toast = await this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom',
            cssClass: 'success-toast',
            color: 'primary',
            mode: 'md',
        });
        toast.present();
        this.subject.next({ type: 'success', text: message });
    }
    /*--------API Error Function alert message--------------*/
    async error(message: string, keepAfterNavigationChange = false) {
        const toast = await this.toastCtrl.create({
            message: message,
            duration: 6000,
            position: 'top',
            cssClass: 'error-toast',
            color: 'danger',
            mode: 'md',
        });
        toast.present();

        this.keepAfterRouteChange = keepAfterNavigationChange;
        this.subject.next({ type: 'error', text: message });
    }
    async showLoading() {
        this.isLoading = true;
        return await this.loadingController.create({
            message: 'Please wait...',
            spinner: 'circular',
            cssClass: 'custom-loading'
        }).then(a => {
            a.present().then(() => {
                if (!this.isLoading) {
                    a.dismiss().then(() => console.log(''));
                }
            });
        });
    }

    //Show loading
    async presentLoading() {
        this._loading = await this.loadingController.create({
            message: 'Loading please wait...',
            duration: 4000,
            cssClass: 'custom-loading'
        });
        await this._loading.present();
        const { role, data } = await this._loading.onDidDismiss();
    }

    async presentAlert(msg) {
        const alert = await this.alertCtrl.create({
            message: msg,
            buttons: ['OK'],
            cssClass: 'alert-info',
            backdropDismiss: false
        });
        await alert.present();
    }

    async presentWarningAlert(msg) {
        const alert = await this.alertCtrl.create({
            message: msg,
            buttons: ['OK'],
            cssClass: 'alert-danger'
        });
        await alert.present();
    }

    clear() {
        // clear by calling subject.next() without parameters
        this.subject.next();
    }
    async hideLoading() {
        this.isLoading = false;
        return await this.loadingController.dismiss().then(() => console.log(''));
    }
}