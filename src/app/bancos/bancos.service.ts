import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CrudService } from './../shared/crud-service';
import { Injectable } from '@angular/core';
import { Banco } from './banco';

@Injectable({
  providedIn: 'root'
})
export class BancosService extends CrudService<Banco>{

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}/bancos`);
  }




}
