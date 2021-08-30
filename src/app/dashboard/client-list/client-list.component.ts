import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClientService } from 'src/app/client.service';
import { Client } from 'src/models/Client';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  clients: Client[] = [];
  showSpinner: boolean;
  totalOwed: number;

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.showSpinner = true;
    this.subscription = this.clientService.getClients().subscribe(clients => {
      this.totalOwed = 0;
      this.clients = clients;
      this.showSpinner = false;
      this.calculateTotalOwed();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
