import { CategoriaResolverGuard } from './guards/categoria-resolver.guard';
import { CategoriaFormComponent } from './categoria-form/categoria-form.component';
import { CategoriasListaComponent } from './categorias-lista/categorias-lista.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: CategoriasListaComponent },
  {
    path: 'novo',
    component: CategoriaFormComponent,
    resolve: {
      categoria: CategoriaResolverGuard
    }
  },
  {
    path: 'editar/:codigo',
    component: CategoriaFormComponent,
    resolve: {
      categoria: CategoriaResolverGuard
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
