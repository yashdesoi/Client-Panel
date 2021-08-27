import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

const rePhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const reEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
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
    Validators.min(0)
  ]);
  

  constructor() { }

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

}
