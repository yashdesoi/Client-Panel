import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFireAuth: AngularFireAuth) { }

  login(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.angularFireAuth.signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData))
        .catch(err => reject(err));
    });
  }

  get getAuthState(): Observable<any> {
    return this.angularFireAuth.authState;
  }
}
