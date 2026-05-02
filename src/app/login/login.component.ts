import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import { AuthStore } from '../services/auth.store';
import { LoadingService } from "../shared/components/loading/loading.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;
  signupForm: UntypedFormGroup;
  isLogin = true;
  // recaptchaResponse: string | null;
  failedMessage = '';

  @Output() onLoggedIn = new EventEmitter();

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private auth: AuthStore,
    private loading: LoadingService,
  ) {
    this.loginForm = fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9-_]*$/)
      ]],
      password: ['', [Validators.required]],
    });
    this.signupForm = fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9-_]*$/)
      ]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  get signupEmail() {
    return this.signupForm.get('email');
  }

  login() {
    const val = this.loginForm.value;
    this.loading.loadingOn();

    this.auth.login(val.email, val.password).subscribe(
      () => {
        if (this.router.url === '/login') {
          this.router.navigateByUrl('/confessions');
        }
        this.onLoggedIn.emit();
        this.loading.loadingOff();
      },
      err => {
        console.log('err: ', err);
        if (err.status === 401) {
          this.failedMessage = 'Login Failed: ' + err.error.message;
        }
        if (err.status === 429) {
          this.failedMessage = 'Login Failed: ' + err.error;
        }
        this.loading.loadingOff();
      }
    );
  }

  signup() {
    // if (! this.recaptchaResponse) return;

    const val = this.signupForm.value;
    this.loading.loadingOn();

    // this.auth.signup(val.email, val.password, this.recaptchaResponse).subscribe(
    this.auth.signup(val.email, val.password).subscribe(
      () => {
        if (this.router.url === '/login') {
          this.router.navigate(['/account/details']);
        }
        this.onLoggedIn.emit();
        this.loading.loadingOff();
      },
      err => {
        this.failedMessage = 'Sign up failed: ' + err.error.message;
        this.loading.loadingOff();
      }
    );
  }

  // recaptchaResolved(recaptchaResponse: string | null) {
  //   this.recaptchaResponse = recaptchaResponse;
  // }
}
