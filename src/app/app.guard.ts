import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/services/auth.service';

@Injectable()
export class AppGuard implements CanActivateChild {

  constructor(private authService: AuthService,
              private router: Router) {}

  canActivateChild(childRoute: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.getAuthState
      .pipe(map(firebaseUser => {
        if (firebaseUser) {
          return true;
        } else {
          this.router.navigate(['/login']);
        }
      }));
  }
  
}
