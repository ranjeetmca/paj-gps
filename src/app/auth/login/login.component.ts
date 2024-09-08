import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public errorMessage: any;
  loginForm: FormGroup;

  submitted = false;
  constructor(
    private authService: AuthenticationService,
    private loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private router: Router,
    private navCtrl: NavController,
    private alertController: AlertController
  ) {
    console.log('helo');
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
          ],
        ],
      },
      {
        // validators: [Validation.match('password', 'confirmPassword')],
      }
    );
    // If coming back after logging into Auth0,
    // and using CURRENT Implicit (web) Login
    if (window.location.hash) {
      const loadingIndicator = await this.showLoadingIndictator();
      try {
        await this.authService.isAuthenticated();
      } catch (e) {
        this.errorMessage = e;
      } finally {
        loadingIndicator.dismiss();
      }
    }
  }
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const encodedPassword = encodeURIComponent(this.loginForm.value.password);

      this.authService
        .login(this.loginForm.value.email, encodedPassword)
        .subscribe({
          // Navigate to home page after successful login
          next: () => this.router.navigate(['tabs/devices']),
          error: (err) =>
          // console.log(err.error.error)
          this.showErrorAlert('Login failed', err.error.error)
        });

    } else {
      console.log('Form is invalid');
    }
  }
  async showErrorAlert(header: string, message: any) {
    console.log(message)
    const alert = await this.alertController.create({
      header: header,
      message: (message.passwordError) ?  message.passwordError : message.emailError,
      buttons: ['OK']
    });

    await alert.present();
  }
  onReset(): void {
    this.submitted = false;
    this.loginForm.reset();
  }

  private async showLoadingIndictator() {
    const loadingIndicator = await this.loadingController.create({
      message: 'Opening login window...',
    });
    await loadingIndicator.present();
    return loadingIndicator;
  }
}
