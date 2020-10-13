import { Component, OnInit } from '@angular/core';
import { DispositivoService } from '../services/dispositivo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  array;

  constructor(public dispositivoServ: DispositivoService) {}

  async ngOnInit(): Promise<void> {
  }

  async ionViewWillEnter(): Promise<void> {
    this.array = await this.dispositivoServ.getListadoHabilitados();
  }

}
