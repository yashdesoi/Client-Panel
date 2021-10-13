import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientManagementService } from 'src/services/client-management.service';
import { Client } from 'src/models/Client';
import { AuthService } from 'src/services/auth.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit, OnDestroy {
  public client: Client;
  public showSpinner: boolean;
  private userId: string;
  private alive: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private clientManagementService: ClientManagementService) { }

  ngOnInit(): void {
    this.alive = true;
    this.showSpinner = true;
    const clientId = this.route.snapshot.params.id;

    this.authService.getAuthState
      .pipe(takeWhile(() => this.alive))
      .subscribe(firebaseUser => {
        if (firebaseUser) {
          this.userId = firebaseUser.uid;
          this.clientManagementService.getClient(this.userId, clientId)
            .pipe(takeWhile(() => this.alive))
            .subscribe(client => {
              if (client) {
                this.client = client;
                this.showSpinner = false;
              } else {
                this.router.navigate(['not-found']);
              }
            });
        }
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  onUpdateBalance(newBalance: number) {
    const isEmailUpdated = false;
    this.client.balance = newBalance;
    this.clientManagementService.updateClient(this.userId, this.client, isEmailUpdated);
  }

  onDeleteClient() {
    const isConfirmed = confirm('Are you sure you want to delete this client?');
    if (isConfirmed) {
      this.clientManagementService.deleteClient(this.userId, this.client.id);
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

}
