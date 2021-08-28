import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from 'src/app/client.service';
import { Client } from 'src/models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  client: Client;
  showSpinner = true;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private clientService: ClientService,
              private flashMessageService: FlashMessagesService) { }

  ngOnInit(): void {
    const clientId = this.route.snapshot.params.id;
    this.clientService.getClient(clientId).subscribe(client => {
      this.client = client;
      this.showSpinner = false;
    });
  }

  onUpdateBalance(newBalance: number) {
    this.client.balance = newBalance;
    this.clientService.updateClient(this.client);
    this.flashMessageService.show('Balance updated', {
      cssClass: 'alert alert-success',
      timeout: 4000
    });
  }

  onDeleteClient() {
    const choice = confirm('Are you sure you want to delete this client?');
    if (choice) {
      this.clientService.deleteClient(this.client.id);
      this.flashMessageService.show('Client removed successfully', {
        cssClass: 'alert alert-info',
        timeout: 4000
      });
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

}
