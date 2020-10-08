import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MedicionService } from '../services/medicion.service';
import { Medicion } from '../model/Medicion';

@Component({
  selector: 'app-mediciones',
  templateUrl: './mediciones.page.html',
  styleUrls: ['./mediciones.page.scss'],
})
export class MedicionesPage implements OnInit {

  public mediciones: Medicion[];

  constructor(private medicionServ: MedicionService, private route: ActivatedRoute) { }

  ngOnInit() {
  }
  
  async ionViewWillEnter() {
    let idDipositivo = +this.route.snapshot.paramMap.get('id');
    this.mediciones = await this.medicionServ.getMediciones(idDipositivo);
  }

}
