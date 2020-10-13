import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MedicionService } from '../services/medicion.service';
import { Riego } from '../model/Riego';

import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-log-riegos',
  templateUrl: './log-riegos.page.html',
  styleUrls: ['./log-riegos.page.scss'],
})
export class LogRiegosPage implements OnInit {

  public riegos: Riego[];
  loading: any;

  constructor(private medicionServ: MedicionService, 
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController
    ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    const loader = await this.presentLoading('Espere...');
    await loader.present();

    let idDipositivo = +this.route.snapshot.paramMap.get('id');
    this.riegos = await this.medicionServ.getRiegos(idDipositivo);
    
    loader.dismiss();
  }

  async presentLoading(message: string) {
    this.loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message
      // duration: 2000
    });
    return this.loading;
  }
}
