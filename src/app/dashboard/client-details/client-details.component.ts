import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientManagementService } from 'src/services/client-management.service';
import { Client } from 'src/models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit, OnDestroy {
  client: Client;
  showSpinner = true;
  
  // Subscriptions
  private subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private clientManagementService: ClientManagementService) { }

  ngOnInit(): void {
    const clientId = this.route.snapshot.params.id;
    this.subscription = this.clientManagementService.getClient(clientId).subscribe(client => {
      if (client) {
        this.client = client;
      } else {
        this.router.navigate(['not-found']);
      }
      this.showSpinner = false;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onUpdateBalance(newBalance: number) {
    const isEmailUpdated = false;
    this.client.balance = newBalance;
    this.clientManagementService.updateClient(this.client, isEmailUpdated);
  }

  onDeleteClient() {
    const isConfirmed = confirm('Are you sure you want to delete this client?');
    if (isConfirmed) {
      this.clientManagementService.deleteClient(this.client.id);
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

}
