import { Component, OnInit } from '@angular/core';
import { DispositivoService } from '../services/dispositivo.service';
import { Dispositivo } from "../model/Dispositivo";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  array;

  constructor(public dispositivoServ: DispositivoService) {}

  ngOnInit(): void {
    this.dispositivoServ.getListado().then((listado) => {
      this.array = listado;
    });
  }

}
