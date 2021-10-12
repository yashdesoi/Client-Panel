import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { LoadingButtonComponent } from './loading-button/loading-button.component';



@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    LoadingButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingSpinnerComponent,
    LoadingButtonComponent
  ]
})
export class SharedModule { }
