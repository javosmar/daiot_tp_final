import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DispositivoService } from '../services/dispositivo.service';
import { Dispositivo } from '../model/Dispositivo';
import { MedicionService } from '../services/medicion.service';
import { Medicion } from '../model/Medicion';

import * as Highcharts from 'highcharts';
declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.page.html',
  styleUrls: ['./dispositivo.page.scss'],
})
export class DispositivoPage implements OnInit {

  private valorObtenido: number = 0;
  public myChart;
  private chartOptions;


  id: number;
  public dispositivo = new Dispositivo(0, " ", " ", 0);
  public medicion = new Medicion(0, ' ', 0, 0);

  constructor(private dispositivoServ: DispositivoService, private medicionServ: MedicionService, private route: ActivatedRoute) { }

  ngOnInit() {

  }

  async ionViewWillEnter() {
    let idDipositivo = +this.route.snapshot.paramMap.get('id');
    this.dispositivo = await this.dispositivoServ.getDispositivo(idDipositivo);
    this.id = idDipositivo;
    this.medicion = await this.medicionServ.getMedicion(idDipositivo);
  }

  ionViewDidEnter() {
    this.generarChart(this.dispositivo);
    this.updateChart(+this.medicion.valor);
  }

  /**
   * Envío el log de apertura para la electroválvula. A modo de prueba, simulo lecturas del sensor
   * para almacenar el log de cuando se cierra la válvula y almacenar la nueva última lectura
   */
  operarElectrovalvula() {
    this.dispositivoServ.postElectrovalvula(1,this.dispositivo.electrovalvulaId);

    // ************************************************************************************
    // Simulo lecturas del sensor para cerrar la válvula y enviar la nueva medición
    // ************************************************************************************
    let valor = 100;
    const intervalObj = setInterval(() => {
      valor = Math.random();
      valor = Math.floor(valor * 100);
      console.log(valor);
      if (valor < 30) {
        clearInterval(intervalObj);
        this.dispositivoServ.postElectrovalvula(0,this.dispositivo.electrovalvulaId);
        this.medicionServ.postMedicion(valor, this.dispositivo.dispositivoId);
        this.updateChart(valor);
      }
    }, 500);
    // ************************************************************************************
    // ************************************************************************************
    
  }

  updateChart(newValue: number) {
    this.valorObtenido = newValue;
    this.myChart.update({
      series: [{
        name: 'kPA',
        data: [this.valorObtenido],
        tooltip: {
          valueSuffix: ' kPA'
        }
      }]
    });
  }

  generarChart(dispositivo: Dispositivo) {
    this.chartOptions = {
      chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
      }
      , title: {
        text: this.dispositivo.nombre
      }

      , credits: { enabled: false }


      , pane: {
        startAngle: -150,
        endAngle: 150
      }
      // the value axis
      , yAxis: {
        min: 0,
        max: 100,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
          step: 2,
          rotation: 'auto'
        },
        title: {
          text: 'kPA'
        },
        plotBands: [{
          from: 0,
          to: 10,
          color: '#55BF3B' // green
        }, {
          from: 10,
          to: 30,
          color: '#DDDF0D' // yellow
        }, {
          from: 30,
          to: 100,
          color: '#DF5353' // red
        }]
      }
      ,

      series: [{
        name: 'kPA',
        data: [this.valorObtenido],
        tooltip: {
          valueSuffix: ' kPA'
        }
      }]

    };
    this.myChart = Highcharts.chart('highcharts', this.chartOptions);
  }

}
