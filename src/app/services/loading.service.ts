import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor(private loadingController: LoadingController) {}

  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 1500, // Automatically dismiss after 1.5 seconds
      spinner: 'crescent', // Optional spinner type
    });

    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
}
