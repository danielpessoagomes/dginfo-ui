import { CategoriasService } from './../categorias.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Categoria } from '../categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaResolverGuard implements Resolve<Categoria> {

  constructor(private service: CategoriasService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Categoria> {
    if (route.params && route.params.codigo) {
      return this.service.findById(route.params.codigo);
    }

    return of({
      codigo: null,
      classificacao: {
        codigo: null,
        descricao: null
      },
      subClassificacao: {
        codigo: null,
        descricao: null
      },
      descricao: null
    });
  }


}
