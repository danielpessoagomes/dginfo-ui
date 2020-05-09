import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bancos-form',
  templateUrl: './bancos-form.component.html',
  styleUrls: ['./bancos-form.component.css']
})
export class BancosFormComponent implements OnInit {

  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({
      nome: [null],
      saldo: [null],
      dataSaldo: [null]
    });
  }
  

  onSubmit(){
    console.log(this.formulario.value);
  }

}
