import { AlertModalService } from './../../shared/alert-modal.service';
import { AlertModalComponent } from './../../shared/alert-modal/alert-modal.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { map, take, catchError, tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../categorias.service';
import { Observable, empty, Subject } from 'rxjs';
import { Categoria } from '../categoria';

@Component({
  selector: 'app-categorias-lista',
  templateUrl: './categorias-lista.component.html',
  styleUrls: ['./categorias-lista.component.css'],
  preserveWhitespaces: true
})
export class CategoriasListaComponent implements OnInit {

  bsModalRef: BsModalRef;
  totalRegistros = 0;

  categorias$: Observable<Categoria>;
  error$ = new Subject<boolean>();

  constructor(
    private service: CategoriasService,
    private alertService: AlertModalService
  ) { }

  ngOnInit(): void {
    this.onRefresh();
  }

  onEdit() {

  }

  onDelete() {

  }

  onRefresh() {
    this.categorias$ = this.service.list()
      .pipe(
        tap(console.log),
        map(dados => dados.data),
        take(1),
        catchError(error => {
          console.error(error);
          //this.error$.next(true);
          this.handlerError();
          return empty();
        })
      );

    this.service.list()
      .pipe(
        catchError(error => empty())
      )
      .subscribe(dados => {
        console.log(dados);

      });
  }

  handlerError() {
    this.alertService.showAlertDanger('Erro ao carregar categorias. Tente novamente mais tarde.');
  }
}
