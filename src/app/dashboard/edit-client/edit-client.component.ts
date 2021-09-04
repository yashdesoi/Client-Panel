import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientManagementService } from 'src/services/client-management.service';
import { SettingsService } from 'src/services/settings.service';
import { Client } from 'src/models/Client';
import { AppResources } from '../../app-resources';
import { AuthService } from 'src/services/auth.service';

const rePhone = AppResources.PHONE_REGEX;
const reEmail = AppResources.EMAIL_REGEX;

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit, OnDestroy {
  disableBalanceOnEdit = this.settingsService.settings.disableBalanceOnEdit;
  showSpinner: boolean;
  form: FormGroup;
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  phone = new FormControl('', [
    Validators.required,
    Validators.pattern(rePhone)
  ]);
  email = new FormControl('', [
    Validators.required,
    Validators.pattern(reEmail)
  ]);
  balance = new FormControl({
    value: 0,
    disabled: this.disableBalanceOnEdit
  }, [
    Validators.required,
    Validators.min(0)
  ]);

  private client: Client;
  private userId: string;
  private clientId: string;

  // Subscriptions
  private subscription1: Subscription;
  private subscription2: Subscription;
  private subscription3: Subscription;

  constructor(private clientManagementService: ClientManagementService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private settingsService: SettingsService,
              private router: Router) { }

  ngOnInit(): void {
    this.showSpinner = true;
    this.form = new FormGroup({
      'firstName': this.firstName,
      'lastName': this.lastName,
      'phone': this.phone,
      'email': this.email,
      'balance': this.balance
    });

    this.clientId = this.route.snapshot.params.id;

    this.subscription1 = this.authService.getAuthState.subscribe(firebaseUser => {
      if (firebaseUser) {
        this.userId = firebaseUser.uid;
        this.subscription2 = this.clientManagementService.getClient(this.userId, this.clientId).subscribe(client => {
          if (client) {
            this.client = client;
            this.showSpinner = false;
          } else {
            this.router.navigate(['/not-found']);
          }
          this.form.patchValue(this.client);
          this.form.markAllAsTouched();
        });
      }
    });

    this.subscription3 = this.clientManagementService.clientUpdated.subscribe(isUpdated => {
      if (isUpdated) {
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
    this.subscription3.unsubscribe();
  }

  onUpdateClient() {
    const isEmailUpdated = this.isEmailUpdated;
    const client: Client = this.form.value;
    client.id = this.clientId;
    this.clientManagementService.updateClient(this.userId, client, isEmailUpdated);
  }

  private get isEmailUpdated() {
    return this.client.email !== this.email.value;
  }

}
