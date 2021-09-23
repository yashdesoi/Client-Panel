import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean;
  username: string;
  allowRegistration = this.settingsService.settings.allowRegistration;
  isMenuCollapsed = true;

  // Subscriptions
  private subscription1: Subscription;
  private subscription2: Subscription;

  constructor(private authService: AuthService,
              private settingsService: SettingsService,
              private router: Router) {}

  ngOnInit(): void {
    this.subscription1 = this.authService.getAuthState.subscribe(firebaseUser => {
      if (firebaseUser) {
        this.isAuthenticated = true;
        this.username = this.getUsername(firebaseUser.email);
      } else {
        this.isAuthenticated = false;
        this.username = null;
      }
    });

    this.subscription2 = this.settingsService.settingsChanged.subscribe(newSettings => {
      this.allowRegistration = newSettings.allowRegistration;
    });
  }

  ngOnDestroy(): void {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
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

  private getUsername(email: string): string {
    return email.split('@')[0];
  }

}
