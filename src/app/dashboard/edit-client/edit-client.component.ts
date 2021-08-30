import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subscription } from 'rxjs';
import { ClientService } from 'src/app/client.service';
import { Client } from 'src/models/Client';
import { ClientResources } from '../client-resources';

const rePhone = ClientResources.PHONE_REGEX;
const reEmail = ClientResources.EMAIL_REGEX;

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit, OnDestroy {
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
  balance = new FormControl(0, [
    Validators.required,
    Validators.min(0)
  ]);
  private subscription1: Subscription;
  private subscription2: Subscription;

  constructor(private clientService: ClientService,
              private route: ActivatedRoute,
              private router: Router,
              private flashMessageService: FlashMessagesService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'firstName': this.firstName,
      'lastName': this.lastName,
      'phone': this.phone,
      'email': this.email,
      'balance': this.balance
    });

    this.clientId = this.route.snapshot.params.id;

    this.subscription1 = this.clientService.getClient(this.clientId).subscribe(client => {
      this.client = client;
      this.form.patchValue(this.client);
      this.form.markAllAsTouched();
    });

    this.subscription2 = this.clientService.clientUpdated.subscribe(isUpdated => {
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
    this.clientService.updateClient(client, isEmailUpdated);
  }

  private get isEmailUpdated() {
    return this.client.email !== this.email.value;
  }

}
