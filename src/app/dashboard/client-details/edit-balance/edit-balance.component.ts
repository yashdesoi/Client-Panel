import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-balance',
  templateUrl: './edit-balance.component.html',
  styleUrls: ['./edit-balance.component.css']
})
export class EditBalanceComponent implements OnInit {
  @Output('balanceUpdate') balanceUpdate = new EventEmitter<number>();
  @Input('balance') balanceValue;
  form: FormGroup;
  balance: FormControl;
  showForm = false;

  constructor() { }

  ngOnInit(): void {
    this.balance = new FormControl(this.balanceValue, [
      Validators.required,
      Validators.min(0)
    ]);
    this.form = new FormGroup({
      'balance': this.balance
    });
    this.balance.valueChanges.subscribe(value => {
      this.balanceValue = value;
    });
  }

}
