import { AlertModalService } from './../../shared/alert-modal.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { map, take, catchError, switchMap } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriasService } from '../categorias.service';
import { Observable, Subject, EMPTY } from 'rxjs';
import { Categoria } from '../categoria';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categorias-lista',
  templateUrl: './categorias-lista.component.html',
  styleUrls: ['./categorias-lista.component.css'],
  preserveWhitespaces: true
})
export class CategoriasListaComponent implements OnInit {

  deleteModalRef: BsModalRef;

  @ViewChild('deleteModal') deleteModal;

  categorias$: Observable<Categoria>;
  error$ = new Subject<boolean>();

  categoriaSelecionado: Categoria;

  constructor(
    private service: CategoriasService,
    private modalService: BsModalService,
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

  onDelete(categoria: Categoria) {
    this.categoriaSelecionado = categoria;
    // this.deleteModalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });

    const result$ = this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja remover esse curso?');
    result$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ? this.service.delete(categoria.codigo) : EMPTY)
      )
      .subscribe(
        success => {
          this.onRefresh();
        },
        error => {
          this.alertService.showAlertDanger('Erro ao remover categorias. Tente novamente mais tarde.');
        }
      );
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
          return EMPTY;
        })
      );

    this.service.list()
      .pipe(
        catchError(error => EMPTY)
      )
      .subscribe(dados => {
        // console.log(dados);
      });
  }

  handlerError() {
    this.alertService.showAlertDanger('Erro ao carregar categorias. Tente novamente mais tarde.');
  }

  onConfirmDelete() {
    this.service.delete(this.categoriaSelecionado.codigo)
      .subscribe(
        success => {
          this.onRefresh();
          this.deleteModalRef.hide();
        },
        error => {
          this.alertService.showAlertDanger('Erro ao remover categorias. Tente novamente mais tarde.');
          this.deleteModalRef.hide();
        }
      );
  }

  onDeclineDelete(): void {
    this.deleteModalRef.hide();
  }
}
