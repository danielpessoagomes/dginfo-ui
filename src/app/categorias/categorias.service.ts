import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Categoria, CategoriaFilter } from './categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private readonly API = 'http://localhost:8080/categorias';

  constructor(
    private http: HttpClient
  ) { }

  list(filter: CategoriaFilter) {
    let params = new HttpParams({
      fromObject: {
        page: filter.pagina.toString(),
        size: filter.itensPorPagina.toString()
      }
    });

    if (filter.descricao) {
      params = params.append('descricao', filter.descricao);
    }

    return this.http.get<any>(this.API, { params });
  }

  create(categoria: Categoria) {
    return this.http.post<Categoria>(this.API, categoria)
      .pipe(
        take(1)
      );
  }

  update(categoria: Categoria) {
    return this.http.put<Categoria>(`${this.API}/${categoria.codigo}`, categoria);
  }

  delete(codigo: number) {
    return this.http.delete<Categoria>(`${this.API}/${codigo}`).pipe(take(1));
  }

  findById(codigo: number) {
    return this.http.get<Categoria>(`${this.API}/${codigo}`)
      .pipe(
        take(1)
      );
  }

}
