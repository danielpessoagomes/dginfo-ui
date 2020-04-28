import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BancosRoutingModule } from './bancos-routing.module';
import { BancosListComponent } from './bancos-list/bancos-list.component';


@NgModule({
  declarations: [BancosListComponent],
  imports: [
    CommonModule,
    BancosRoutingModule
  ]
})
export class BancosModule { }
