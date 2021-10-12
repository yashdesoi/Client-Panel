import { Component, Input, OnInit } from '@angular/core';

interface LoadingBtnProperties {
  'is-disabled': boolean;
  'is-loading': boolean;
  'btn-type': 'submit' | 'button';
  'btn-class': string;
}

@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.css']
})
export class LoadingButtonComponent implements OnInit {
  public isDisabled: boolean;
  public isLoading: boolean;
  public btnType: 'submit' | 'button';
  public btnClass: string;
  @Input() set btnProperties(value: LoadingBtnProperties) {
    this.isDisabled = value['is-disabled'];
    this.isLoading = value['is-loading'];
    this.btnType = value['btn-type'];
    this.btnClass = value['btn-class'];
  }

  constructor() { }

  ngOnInit(): void {
  }

}
