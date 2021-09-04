import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClientManagementService } from 'src/services/client-management.service';
import { Client } from 'src/models/Client';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit, OnDestroy {
  clients: Client[] = [];
  showSpinner: boolean;
  totalOwed: number;
  
  // Subscriptions
  private subscription1: Subscription;
  private subscription2: Subscription;
  
  constructor(private clientManagementService: ClientManagementService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.showSpinner = true;
    this.subscription1 = this.authService.getAuthState.subscribe(firebaseUser => {  
      if (firebaseUser) {
        this.subscription2 = this.clientManagementService.getClients(firebaseUser.uid).subscribe(clients => {
          this.totalOwed = 0;
          this.clients = clients;
          this.calculateTotalOwed();
          this.showSpinner = false;
        });
      }
    });

  }

  ngOnDestroy(): void {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }

  public getFullname(client: Client) {
    return client.firstName + ' ' + client.lastName;
  }

  private calculateTotalOwed() {
    this.clients.forEach(client => {
      this.totalOwed += client.balance;
    });
  }

}
