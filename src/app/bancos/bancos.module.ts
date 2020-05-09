import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BancosRoutingModule } from './bancos-routing.module';
import { BancosListComponent } from './bancos-list/bancos-list.component';
import { BancosFormComponent } from './bancos-form/bancos-form.component';


@NgModule({
  declarations: [BancosListComponent, BancosFormComponent],
  imports: [
    CommonModule,
    BancosRoutingModule,
    ReactiveFormsModule
  ]
})
export class BancosModule { }
