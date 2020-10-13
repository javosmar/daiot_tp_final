import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MedicionService } from '../services/medicion.service';
import { Medicion } from '../model/Medicion';

import { HttpClient } from '@angular/common/http';

import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-mediciones',
  templateUrl: './mediciones.page.html',
  styleUrls: ['./mediciones.page.scss'],
})
export class MedicionesPage implements OnInit {

  public mediciones: Medicion[];

  chartData: ChartDataSets[] = [{ data: [], label: 'Temperatura' }, { data: [], label: 'Humedad' }];
  chartLabels: Label[];

  chartOptions = {
    elements: {
      line: {
        tension: 0 // disables bezier curves
      }
    },
    animation: {
      duration: 0 // general animation time
    },
    hover: {
      animationDuration: 0 // duration of animations when hovering an item
    },
    responsiveAnimationDuration: 0, // animation duration after a resize
    responsive: true,
    title: {
      display: true,
      text: 'Historial de lecturas'
    },
    pan: {
      enabled: true,
      mode: 'x'
    },
    zoom: {
      enabled: true,
      mode: 'x'
    },
    scales: {
      yAxes: [{
        ticks: {
          suggestedMin: 0,
          suggestedMax: 50
        }
      }],
      xAxes: [{
        type: 'time',
        time: {
          unit: 'minute'
        }
      }]
    }
  };
  chartColors: Color[] = [
    {
      borderColor: 'rgba(86,74,6,1)',
      backgroundColor: 'rgba(237,221,185,.4)'
    },
  ];
  chartType = 'line';
  showLegend = true;

  loading: any;

  constructor(private medicionServ: MedicionService, 
      private route: ActivatedRoute, 
      private http: HttpClient, 
      private loadingCtrl: LoadingController
    ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    const loader = await this.presentLoading('Espere...');
    await loader.present();

    let idDipositivo = +this.route.snapshot.paramMap.get('id');
    this.mediciones = await this.medicionServ.getMediciones(idDipositivo);
    for (let medicion of this.mediciones) {
      medicion.fecha = new Date(medicion.fecha).toISOString().replace(/T/, ' ').replace(/\..+/, '');
    }
    this.getData();
    loader.dismiss();
  }

  async getData() {
    this.chartLabels = [];
    this.chartData[0].data = [];
    this.chartData[1].data = [];

    for (let entry of this.mediciones) {
      this.chartLabels.push(entry.fecha);
      this.chartData[0].data.push(entry['temp']);
      this.chartData[1].data.push(entry['hum']);
    }
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
