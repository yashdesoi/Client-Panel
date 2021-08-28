import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from 'src/app/client.service';

const rePhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const reEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  disableBalanceOnAdd = false;
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
  balance = new FormControl(
    {
      value: 0,
      disabled: this.disableBalanceOnAdd
    }, [
      Validators.required,
      Validators.min(0)
    ]
  );
  

  constructor(private flashMessageService: FlashMessagesService,
              private router: Router,
              private route: ActivatedRoute,
              private clientService: ClientService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'name': new FormGroup({
        'firstName': this.firstName,
        'lastName': this.lastName
      }),
      'phone': this.phone,
      'email': this.email,
      'balance': this.balance
    });
  }

  onAddClient() {
    const value = this.getFormValue();
    this.clientService.addClient(value);
    this.flashMessageService.show('New client added', {
      cssClass: 'alert alert-success',
      timeout: 4000
    })
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private getFormValue() {
    const { name, phone, email, balance } = this.form.value;
    const { firstName, lastName} = name;
    const value = { firstName, lastName, phone, email, balance };

    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }

    return value;
  }

}
