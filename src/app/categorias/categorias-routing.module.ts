import { CategoriaFormComponent } from './categoria-form/categoria-form.component';
import { CategoriasListaComponent } from './categorias-lista/categorias-lista.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', component: CategoriasListaComponent},
  {path: 'novo', component: CategoriaFormComponent},
  {path: 'editar/:codigo', component: CategoriaFormComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
