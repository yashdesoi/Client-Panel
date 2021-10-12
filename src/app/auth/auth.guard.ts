import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SettingsService } from '../../services/settings.service';
import { AuthService } from '../../services/auth.service';
import { AuthModule } from './auth.module';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private settingsService: SettingsService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (state.url.includes('/register') && this.settingsService.settings.allowRegistration) {
      return this.authService.getAuthState
        .pipe(map(firebaseUser => {
          if (!firebaseUser) {
            return true;
          } else {
            this.router.navigate(['/']);
          }
        }));
    } else if (state.url.includes('/register')) {
      this.router.navigate(['/login']);
    } else {
      return this.authService.getAuthState
        .pipe(map(firebaseUser => {
          if (!firebaseUser) {
            return true;
          } else {
            this.router.navigate(['/']);
          }
        }));
    }
  }
}
