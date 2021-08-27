import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientService } from 'src/app/client.service';
import { Client } from 'src/models/Client';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];
  showSpinner: boolean;
  totalOwed = 0;

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.showSpinner = true;
    this.clientService.getClients().subscribe(clients => {
      console.log(clients);
      this.clients = clients;
      this.showSpinner = false;
      this.calculateTotalOwed();
    });
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
