import { AlertModalService } from './../../shared/alert-modal.service';
import {  BsModalRef } from 'ngx-bootstrap/modal';
import { map, take, catchError, tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../categorias.service';
import { Observable, empty, Subject } from 'rxjs';
import { Categoria } from '../categoria';
import { Router, ActivatedRoute } from '@angular/router';

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
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.onRefresh();
  }

  onEdit(codigo: number) {
    this.router.navigate(['editar', codigo], { relativeTo: this.route });
  }

  onDelete() {

  }

  onRefresh() {
    this.categorias$ = this.service.list()
      .pipe(
        // tap(console.log),
        map(dados => dados.data),
        take(1),
        catchError(error => {
          // console.error(error);
          // this.error$.next(true);
          this.handlerError();
          return empty();
        })
      );

    this.service.list()
      .pipe(
        catchError(error => empty())
      )
      .subscribe(dados => {
        // console.log(dados);
      });
  }

  handlerError() {
    this.alertService.showAlertDanger('Erro ao carregar categorias. Tente novamente mais tarde.');
  }
}
