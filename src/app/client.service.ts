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

  constructor(private fireStore: AngularFirestore) {}

  getClients(): Observable<Client[]> {
    this.initClients();  
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

  addClient(data) {
    this.initClients();
    this.clientsCollection.add(data);
  }

  getClient(id: string): Observable<Client> {
    this.initClient(id);
    return this.clientDocument
      .snapshotChanges()
      .pipe(map(
        change => {
          const data = (change.payload.data() as Client);
          data.id = change.payload.id;
          return data;
        }
      ));
  }

  updateClient(client: Client): void {
    this.initClient(client.id);
    this.clientDocument.update(client);
  }

  deleteClient(id: string): void {
    this.initClient(id);
    this.clientDocument.delete();
  }


  private initClients(): void {
    this.clientsCollection = this.fireStore.collection('clients', ref => {
      return ref.orderBy('lastName', 'desc');
    });
  }

  private initClient(id: string): void {
    this.clientDocument = this.fireStore.doc(`clients/${id}`);
  }
}
