import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  public isAuthenticated: boolean;
  public username: string;
  public allowRegistration = this.settingsService.settings.allowRegistration;
  public isMenuCollapsed = true;
  private alive: boolean;  

  constructor(private authService: AuthService,
              private settingsService: SettingsService,
              private router: Router) {}

  ngOnInit(): void {
    this.alive = true;

    this.authService.getAuthState
      .pipe(takeWhile(() => this.alive))
      .subscribe(firebaseUser => {
        if (firebaseUser) {
          this.isAuthenticated = true;
          this.username = this.getUsername(firebaseUser.email);
        } else {
          this.isAuthenticated = false;
          this.username = null;
        }
      });

    this.settingsService.settingsChanged
      .pipe(takeWhile(() => this.alive))
      .subscribe(newSettings => {
        this.allowRegistration = newSettings.allowRegistration;
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
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
