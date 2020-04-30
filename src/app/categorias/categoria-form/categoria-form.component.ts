import { AlertModalService } from './../../shared/alert-modal.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriasService } from '../categorias.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../categoria';
import { map, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private service: CategoriasService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Primeira forma
    // this.route.params.subscribe(
    //   (params: any) => {
    //     const codigo = params['codigo'];
    //     const categoria$ = this.service.findById(codigo)
    //     categoria$.subscribe(categoria => {
    //       console.log(categoria);
    //       this.updateForm(categoria);
    //     })
    //   }
    // );

    // Segunda forma
    // this.route.params
    //   .pipe(
    //     map((params: any) => params.codigo),
    //     switchMap(codigo => this.service.findById(codigo))
    //     // Caso de formArray ->
    //   )
    //   .subscribe(
    //     categoria => this.form.patchValue(categoria)
    //   );

    // concatMap -> ordem da requisação importa
    // mergeMap -> ordem não importa
    // exhaustMap -> casos de login

    const categoria = this.route.snapshot.data.categoria;

    this.configureForm(categoria);
  }

  configureForm(categoria: Categoria) {
    return this.form = this.fb.group({
      codigo: [categoria.codigo],
      classificacao: this.fb.group({
        codigo: [categoria.classificacao.codigo, Validators.required]
      }),
      subClassificacao: this.fb.group({
        codigo: [categoria.subClassificacao.codigo, Validators.required]
      }),
      descricao: [categoria.descricao, Validators.required]
    });
  }

  // updateForm(categoria: Categoria) {
  //   this.form.patchValue(categoria);
  // }

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      console.log(this.form);
      if (this.form.value.codigo) {
        this.service.update(this.form.value)
          .subscribe(
            success => {
              this.modal.showAlertSuccess('Categoria atualizada com sucesso');
              this.location.back();
            },
            error => this.modal.showAlertDanger('Erro ao atualizar categoria. Tente novamente'),
            () => console.log('Update OK')
          );
      } else {
        this.service.create(this.form.value)
          .subscribe(
            success => {
              this.modal.showAlertSuccess('Categoria criada com sucesso');
              this.location.back();
            },
            error => this.modal.showAlertDanger('Erro ao criar categoria. Tente novamente'),
            () => console.log('Request OK')
          );
      }
    }

  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
    this.router.navigate(['categorias/novo']);
  }

}
