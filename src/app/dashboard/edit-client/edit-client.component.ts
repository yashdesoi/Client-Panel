import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientManagementService } from 'src/services/client-management.service';
import { SettingsService } from 'src/services/settings.service';
import { Client } from 'src/models/Client';
import { AppResources } from '../../app-resources';

const rePhone = AppResources.PHONE_REGEX;
const reEmail = AppResources.EMAIL_REGEX;

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit, OnDestroy {
  disableBalanceOnEdit = this.settingsService.settings.disableBalanceOnEdit;
  client: Client;
  clientId: string;
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

  // Subscriptions
  private subscription1: Subscription;
  private subscription2: Subscription;

  constructor(private clientManagementService: ClientManagementService,
              private route: ActivatedRoute,
              private settingsService: SettingsService,
              private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'firstName': this.firstName,
      'lastName': this.lastName,
      'phone': this.phone,
      'email': this.email,
      'balance': this.balance
    });

    this.clientId = this.route.snapshot.params.id;

    this.subscription1 = this.clientManagementService.getClient(this.clientId).subscribe(client => {
      if (client) {
        this.client = client;
      } else {
        this.router.navigate(['/not-found']);
      }
      this.form.patchValue(this.client);
      this.form.markAllAsTouched();
    });

    this.subscription2 = this.clientManagementService.clientUpdated.subscribe(isUpdated => {
      if (isUpdated) {
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }

  onUpdateClient() {
    const isEmailUpdated = this.isEmailUpdated;
    const client: Client = this.form.value;
    client.id = this.clientId;
    this.clientManagementService.updateClient(client, isEmailUpdated);
  }

  private get isEmailUpdated() {
    return this.client.email !== this.email.value;
  }

}
