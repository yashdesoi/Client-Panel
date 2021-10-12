import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '../models/Client';

@Injectable()
export class ClientManagementService {
  private clientsCollection: AngularFirestoreCollection;
  private clientDocument: AngularFirestoreDocument;
  public clientAdded = new Subject<boolean>();
  public clientUpdated = new Subject<boolean>();
  
  // Subscriptions
  private subscription: Subscription;

  constructor(private fireStore: AngularFirestore,
              private flashMessageService: FlashMessagesService) {}

  getClients(userId: string): Observable<Client[]> {
    this.initClients(userId);
    return this.clientsCollection
      .snapshotChanges()
      .pipe(map(
        changes => {
          return changes.map(change => {
            const data = (change.payload.doc.data() as Client);
            data.id = change.payload.doc.id;
            return data;
          });
        }
      ));
  }

  getClient(userId: string, clientId: string): Observable<Client> {
    this.initClient(userId, clientId);
    return this.clientDocument
      .snapshotChanges()
      .pipe(map(
        change => {
          const data = (change.payload.data() as Client);
          if (data) {
            data.id = change.payload.id;
          }
          return data;
        }
      ));
  }

  addClient(userId: string, data): void {
    this.subscription = this.checkForDuplicateEmail(userId, data.email)
      .subscribe(isDuplicate => {
        if (isDuplicate) {
          this.clientAdded.next(false);
          this.showFlashMessage('Following email already exists', false);
        } else {
          this.initClients(userId);
          this.clientsCollection.add(data);
          this.clientAdded.next(true);
          this.showFlashMessage('Client added successfully', true);
        }
        this.subscription.unsubscribe();
      });
  }

  updateClient(userId: string, client: Client, isEmailUpdated: boolean): void {
    if (isEmailUpdated) {
      this.subscription = this.checkForDuplicateEmail(userId, client.email)
        .subscribe(isDuplicate => {
          if (isDuplicate) {
            this.clientUpdated.next(false);
            this.showFlashMessage('Client with following email already exist', false);
          } else {
            this.initClient(userId, client.id);
            this.clientDocument.update(client);
            this.clientUpdated.next(true);
            this.showFlashMessage('Client updated successfully', true);
          }
          this.subscription.unsubscribe();
        });
    } else {
      this.initClient(userId, client.id);
      this.clientDocument.update(client);
      this.clientUpdated.next(true);
      this.showFlashMessage('Client updated successfully', true);
    }
  }

  deleteClient(userId: string, clientId: string): void {
    this.initClient(userId, clientId);
    this.clientDocument.delete();
    this.showFlashMessage('Client removed successfully', true);
  }

  private initClients(userId: string): void {
    this.clientsCollection = this.fireStore.collection(userId, ref => {
      return ref.orderBy('lastName', 'desc');
    });
  }

  private initClient(userId: string, clientId: string): void {
    this.clientDocument = this.fireStore.doc(`${userId}/${clientId}`);
  }

  private checkForDuplicateEmail(userId: string, email: string): Observable<boolean> {
    this.clientsCollection = this.fireStore.collection(userId, ref => {
      return ref.where('email', '==', email);
    });
    return this.clientsCollection
      .snapshotChanges()
      .pipe(map(changes => {
        return (changes.length > 0);
      }));
  }

  private showFlashMessage(text: string, isSuccess: boolean) {
    this.flashMessageService.show(text, {
      cssClass: isSuccess ? 'alert alert-success' : 'alert alert-danger',
      timeout: 4000
    })
  }

}
