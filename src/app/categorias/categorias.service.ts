import { tap, delay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Categoria } from './categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private readonly API = 'http://localhost:8080/categorias';

  constructor(
    private http: HttpClient
  ) { }

  list() {
    return this.http.get<Categoria>(this.API)
      .pipe(
        delay(2000),
        tap(console.log ),
        map(r => {
          const data = r.content;
          const response = {
            data,
            total: r.totalElements
          };

          return response;
        })
      );
  }

}
