import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subscription } from 'rxjs';
import { AppResources } from 'src/app/app-resources';
import { AuthService } from '../auth.service';

const reEmail = AppResources.EMAIL_REGEX;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  email = new FormControl(null, [
    Validators.required,
    Validators.pattern(reEmail)
  ]);
  password = new FormControl(null, Validators.required);

  // Subscriptions
  subscription: Subscription;

  constructor(private authService: AuthService,
              private flashMessageService: FlashMessagesService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'email': this.email,
      'password': this.password
    });

    this.subscription = this.authService.getAuthState.subscribe(value => {
      console.log(value);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onLogin() {
    this.authService.login(this.email.value, this.password.value)
      .then(data => {
        console.log('success', data);
        this.flashMessageService.show('User logged in', {
          cssClass: 'alert alert-success',
          timeout: 4000
        });
      })
      .catch(err => {
        console.log('failure', err.message);
        this.flashMessageService.show('Incorrect email or password', {
          cssClass: 'alert alert-danger',
          timeout: 4000
        });
      });
  }

}
