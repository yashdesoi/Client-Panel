import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login-google',
  templateUrl: './login-google.component.html',
  styleUrls: ['./login-google.component.css']
})
export class LoginGoogleComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onLoginWithGoogle() {
    this.authService.loginWithGoogle()
      .then(data => {
        this.router.navigate(['/']);
      })
      .catch(err => {
        console.log(err.message)
      });
  }


}
