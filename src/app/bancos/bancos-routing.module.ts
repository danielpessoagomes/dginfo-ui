import { BancosFormComponent } from './bancos-form/bancos-form.component';
import { BancosListComponent } from './bancos-list/bancos-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', component: BancosListComponent},
  {path: 'novo', component: BancosFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BancosRoutingModule { }
