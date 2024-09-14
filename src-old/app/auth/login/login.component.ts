import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from '../../services/authentication.service';
import { AlertService } from 'src/app/services/alert.service';

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
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
      },
      {}
    );
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
          next: () => this.router.navigate(['/devices']),
          error: (err) =>
            this.alertService.showErrorAlert('Login failed', err.error.error),
        });
    } else {
      console.log('Form is invalid');
    }
  }

  onReset(): void {
    this.submitted = false;
    this.loginForm.reset();
  }
}
