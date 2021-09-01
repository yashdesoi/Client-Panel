import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean;
  loggedinUserEmail: string;

  // Subscriptions
  private subscription: Subscription;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.authService.getAuthState.subscribe(authObject => {
      if (authObject) {
        this.isAuthenticated = true;
        this.loggedinUserEmail = authObject.email;
      } else {
        this.isAuthenticated = false;
        this.loggedinUserEmail = null;
      }
    });
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onLogout(): void {
    const isConfirmed = confirm('Are you sure you want to log out?');
    if (isConfirmed) {
      this.authService.logout()
        .then(() => {
          this.router.navigate(['/login']);
        });
    }
  }

}
