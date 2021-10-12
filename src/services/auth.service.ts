import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FlashMessagesService } from 'angular2-flash-messages';
import firebase from 'firebase/app';

@Injectable()
export class AuthService {

  constructor(private angularFireAuth: AngularFireAuth,
              private flashMessageService: FlashMessagesService) { }

  login(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.angularFireAuth.signInWithEmailAndPassword(email, password)
        .then(userData => {
          resolve(userData);
          this.showMessage('You are now logged in', true);
        })
        .catch(err => {
          reject(err);
          this.showMessage('Incorrect email or password', false);
        });
    });
  }

  loginWithGoogle(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.angularFireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(userData => {
          resolve(userData);
          this.showMessage('You are now logged in', true);
        })
        .catch(err => {
          reject(err);
          if (err.code === 'auth/network-request-failed') {
            this.showMessage('Network error', false);
          }
        });
    });
  }

  logout(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.angularFireAuth.signOut()
        .then(() => {
          resolve(null);
          this.showMessage('You are now logged out', true);
        })
        .catch(err => {
          reject(err);
          this.showMessage(err.message, false);
        });
    });  
  }

  register(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.angularFireAuth.createUserWithEmailAndPassword(email, password)
        .then(userData => {
          resolve(userData);
          this.showMessage('New account created successfully', true);
        })
        .catch(err => {
          reject(err);
          this.showMessage('Following email is already registered', false);
        });
    });
  }

  private showMessage(messageText: string, isSuccess: boolean): void {
    this.flashMessageService.show(messageText, {
      cssClass: isSuccess ? 'alert alert-success' : 'alert alert-danger',
      timeout: 4000
    });
  }

  get getAuthState() {
    return this.angularFireAuth.authState;
  }
}
