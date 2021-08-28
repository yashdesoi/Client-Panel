import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from 'src/app/client.service';
import { Client } from 'src/models/Client';

const rePhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const reEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
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

    this.clientService.getClient(this.clientId).subscribe(client => {
      this.client = client;
      this.form.patchValue(this.client);
      this.form.markAllAsTouched();
    });
  }

  onUpdateClient() {
    this.client = this.form.value;
    this.client.id = this.clientId;
    this.clientService.updateClient(this.client);
    this.flashMessageService.show('Client details updated', {
      cssClass: 'alert alert-success',
      timeout: 4000
    });
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
