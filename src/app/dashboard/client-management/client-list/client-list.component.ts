import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppStateService } from 'src/app/app-state.service';
import { ClientService } from 'src/app/client.service';
import { Client } from 'src/models/Client';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];
  totalOwed = 0;

  constructor(private clientService: ClientService,
              private appStateService: AppStateService) { }

  ngOnInit(): void {
    this.appStateService.sidebarState.next('ClientList');
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
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
