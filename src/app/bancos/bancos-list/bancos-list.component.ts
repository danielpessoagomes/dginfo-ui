import { BancosService } from './../bancos.service';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-bancos-list',
  templateUrl: './bancos-list.component.html',
  styleUrls: ['./bancos-list.component.css']
})
export class BancosListComponent implements OnInit {

  constructor(private service: BancosService) { }

  ngOnInit() {
    this.service.list().subscribe(dados => console.log(dados));
  }

}
