import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppResources } from 'src/app/app-resources';
import { AuthService } from '../../../services/auth.service';

const reEmail = AppResources.EMAIL_REGEX;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  email = new FormControl(null, [
    Validators.required,
    Validators.pattern(reEmail)
  ]);
  password = new FormControl(null, Validators.required);

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'email': this.email,
      'password': this.password
    });
  }

  onLogin() {
    this.authService.login(this.email.value, this.password.value)
      .then(data => {
        this.router.navigate(['/']);
      })
      .catch(err => console.log(err.message));
  }

}
