import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientManagementService } from 'src/services/client-management.service';
import { Client } from 'src/models/Client';
import { AuthService } from 'src/services/auth.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit, OnDestroy {
  public clients: Client[] = [];
  public showSpinner: boolean;
  public totalOwed: number;
  private alive: boolean;
  
  constructor(private clientManagementService: ClientManagementService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.alive = true;
    this.showSpinner = true;
    this.authService.getAuthState
      .pipe(takeWhile(() => this.alive))
      .subscribe(firebaseUser => {  
        if (firebaseUser) {
          this.clientManagementService.getClients(firebaseUser.uid)
            .pipe(takeWhile(() => this.alive))
            .subscribe(clients => {
              this.totalOwed = 0;
              this.clients = clients;
              this.calculateTotalOwed();
              this.showSpinner = false;
            });
        }
      });

  }

  ngOnDestroy(): void {
    this.alive = false;
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
