import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController) { }

  async showErrorAlert(header: string, message: any) {
    console.log(message);
    const alert = await this.alertController.create({
      header: header,
      message: message.passwordError
        ? message.passwordError
        : message.emailError,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
