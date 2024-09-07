import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  isSubmitted = false;
  constructor(public formBuilder: FormBuilder,
    private utilService: UtilService,
    private _navController:NavController,
    private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required]],
      act:'login'
    })
  }
  get errorControl() {
    return this.loginForm.controls;
  }
  submitForm() {
    this.isSubmitted = true;
    // if (!this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe((data: any) => {
        console.log(data)
        if (data.success) {
          localStorage.setItem('currentUser', JSON.stringify(data.success));
          this._navController.navigateRoot('/devices');
        }
      },
        error => {
          this.utilService.error(JSON.stringify(error.error.error))
        });
    // } else {
    //   console.log(this.loginForm.value)
    // }
  }
}
