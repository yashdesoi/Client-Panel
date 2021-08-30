import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subscription } from 'rxjs';
import { ClientService } from 'src/app/client.service';
import { Client } from 'src/models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit, OnDestroy {
  private subscription: Subscription
  client: Client;
  showSpinner = true;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private clientService: ClientService,
              private flashMessageService: FlashMessagesService) { }

  ngOnInit(): void {
    const clientId = this.route.snapshot.params.id;
    this.subscription = this.clientService.getClient(clientId).subscribe(client => {
      this.client = client;
      this.showSpinner = false;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onUpdateBalance(newBalance: number) {
    const isEmailUpdated = false;
    this.client.balance = newBalance;
    this.clientService.updateClient(this.client, isEmailUpdated);
  }

  onDeleteClient() {
    const choice = confirm('Are you sure you want to delete this client?');
    if (choice) {
      this.clientService.deleteClient(this.client.id);
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

}
