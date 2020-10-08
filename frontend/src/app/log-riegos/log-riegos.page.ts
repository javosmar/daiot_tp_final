import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MedicionService } from '../services/medicion.service';
import { Riego } from '../model/Riego';

@Component({
  selector: 'app-log-riegos',
  templateUrl: './log-riegos.page.html',
  styleUrls: ['./log-riegos.page.scss'],
})
export class LogRiegosPage implements OnInit {

  public riegos: Riego[];

  constructor(private medicionServ: MedicionService, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    let idDipositivo = +this.route.snapshot.paramMap.get('id');
    this.riegos = await this.medicionServ.getRiegos(idDipositivo);
  }
}
