import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppResources } from 'src/app/app-resources';
import { AuthService } from '../auth.service';

const reEmail = AppResources.EMAIL_REGEX;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  email = new FormControl(null, [
    Validators.required,
    Validators.pattern(reEmail)
  ]);
  password = new FormControl(null, [
    Validators.required,
    Validators.minLength(8)
  ]);
  confirmPassword = new FormControl(null, [
    Validators.required,
    Validators.pattern(`^${this.password.value}$`)
  ]);
  passwords = new FormArray([
    this.password
  ]);

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'email': this.email,
      'passwords': this.passwords
    });

    this.password.valueChanges.subscribe(() => {

      // Updating validation requirements
      this.confirmPassword.setValidators([
        Validators.required,
        Validators.pattern(`^${this.password.value}$`)
      ]);
      this.confirmPassword.updateValueAndValidity();

      // Adding/removing password confirmation input according to password value
      if (this.password.valid && this.passwords.length <= 1) {
        this.passwords.push(this.confirmPassword);
      } else if (this.password.invalid && this.passwords.length > 1 ) {
        this.confirmPassword.reset();
        this.passwords.removeAt(1)
      }

    });
  }

  onRegister(): void {
    this.authService.register(this.email.value, this.password.value)
      .then(data => {
        this.router.navigate(['/']);
      })
      .catch(err => console.log(err.message));
  }

}
