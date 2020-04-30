import { CategoriaFilter } from './../categoria';
import { AlertModalService } from './../../shared/alert-modal.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { map, take, catchError, switchMap, tap, filter } from 'rxjs/operators';
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
  totalItems = 0;
  itemsPerPage = 0;
  currentPage = 0;

  filter = new CategoriaFilter();

  @ViewChild('deleteModal') deleteModal;

  categorias$: Observable<Categoria>;
  error$ = new Subject<boolean>();

  categoriaSelecionado: Categoria;

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

  onRefresh(page = this.currentPage - 1) {
    this.filter.pagina = page;
    this.categorias$ = this.service.list(this.filter)
      .pipe(
        tap(dados => {
          this.totalItems = dados.totalElements;
          this.itemsPerPage = dados.size;
        }),
        map(dados => dados.content),
        take(1),
        catchError(error => {
          // console.error(error);
          // this.error$.next(true);
          this.handlerError();
          return EMPTY;
        })
      );
  }

  onChangedPaged(event: any): void {
    this.currentPage = event.page;
    this.onRefresh(event.page - 1);
  }

  handlerError() {
    this.alertService.showAlertDanger('Erro ao carregar categorias. Tente novamente mais tarde.');
  }

  onConfirmDelete() {
    this.service.delete(this.categoriaSelecionado.codigo)
      .subscribe(
        success => {
          this.onRefresh(this.currentPage);
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
