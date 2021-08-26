import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '../models/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private clientsCollection: AngularFirestoreCollection;
  private clientDocument: AngularFirestoreDocument;

  constructor(private fireStore: AngularFirestore) {
    this.clientsCollection = this.fireStore.collection('clients', ref => {
      return ref.orderBy('lastName', 'desc');
    });
  }

  getClients(): Observable<Client[]> {
    return this.clientsCollection
      .snapshotChanges()
      .pipe(map(
        changes => {
          return changes.map(action => {
            const data = (action.payload.doc.data() as Client)
            data.id = action.payload.doc.id;
            return data;
          });
        }
      ));
  }
}
