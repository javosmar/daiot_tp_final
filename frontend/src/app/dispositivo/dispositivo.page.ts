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
  public myChart2;
  private chartOptions;
  private chartOptions2;


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
    this.updateChart(+this.medicion.temp, +this.medicion.hum);
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
        this.updateChart(valor, 1);
      }
    }, 500);
    // ************************************************************************************
    // ************************************************************************************
    
  }

  updateChart(newTemp: number, newHum: number) {
    this.valorObtenido = newTemp;
    this.myChart.update({
      series: [{
        name: 'Temp',
        data: [this.valorObtenido],
        tooltip: {
          valueSuffix: ' ºC'
        }
      }]
    });

    this.valorObtenido = newHum;
    this.myChart2.update({
      series: [{
        name: 'Hum',
        data: [this.valorObtenido],
        tooltip: {
          valueSuffix: ' %'
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
        text: 'Temperatura' /* this.dispositivo.nombre */
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
          text: 'ºC'
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
        name: 'Temp',
        data: [this.valorObtenido],
        tooltip: {
          valueSuffix: ' ºC'
        }
      }]

    };

    this.chartOptions2 = {
      chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
      }
      , title: {
        text: 'Humedad' /* this.dispositivo.nombre */
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
          text: '%'
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
        name: 'Hum',
        data: [this.valorObtenido],
        tooltip: {
          valueSuffix: ' %'
        }
      }]

    };

    this.myChart = Highcharts.chart('highcharts', this.chartOptions);

    this.myChart2 = Highcharts.chart('highcharts2', this.chartOptions2);
  }

}
