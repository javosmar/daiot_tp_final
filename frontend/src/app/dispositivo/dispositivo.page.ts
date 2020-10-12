import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DispositivoService } from '../services/dispositivo.service';
import { Dispositivo } from '../model/Dispositivo';
import { MedicionService } from '../services/medicion.service';
import { Medicion } from '../model/Medicion';

import { Subscription } from 'rxjs';
import { IMqttMessage, MqttService } from 'ngx-mqtt';

import * as Highcharts from 'highcharts';
declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.page.html',
  styleUrls: ['./dispositivo.page.scss'],
})
export class DispositivoPage implements OnInit, OnDestroy {

  private valorObtenido: number = 0;
  private estadoEv: number = 0;

  // Gauges Charts
  public myChart;
  public myChart2;
  private chartOptions;
  private chartOptions2;

  // Models initialization
  id: number;
  public dispositivo = new Dispositivo(0, " ", " ", 0);
  public medicion = new Medicion(0, ' ', 0, 0, 0);

  // MQTT
  private subscription: Subscription;
  topicname: any;
  msg: any;
  isConnected: boolean = false;

  // Topics
  subscriptionTopic = '';
  electrovalvulaTopic = '';
  responsePayload = '';

  /**
   * Me suscribo al tópico desde el cual quiero recibir los mensajes para el dispositivo
   */
  constructor(private dispositivoServ: DispositivoService, private medicionServ: MedicionService, private route: ActivatedRoute, private mqttService: MqttService) {
    
  }

  ngOnInit() {

  }

  /**
   * Antes de salir de la vista me desuscribo de los tópicos
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async ionViewWillEnter() {
    let idDipositivo = +this.route.snapshot.paramMap.get('id');
    this.dispositivo = await this.dispositivoServ.getDispositivo(idDipositivo);
    this.id = idDipositivo;
    this.suscription();
    // Obtengo la última medición y el último estado de la electroválvula
    this.medicion = await this.medicionServ.getMedicion(idDipositivo);
    this.estadoEv = await this.dispositivoServ.getEstadoEv(idDipositivo);
  }

  /**
   * Una vez cargada la página, genero los gráficos y actualizo los valores
   */
  ionViewDidEnter() {
    this.generarChart(this.dispositivo);
    this.updateChart(+this.medicion.temp, +this.medicion.hum);
  }

  /**
   * Envío el log de apertura para la electroválvula. A modo de prueba, simulo lecturas del sensor
   * para almacenar el log de cuando se cierra la válvula y almacenar la nueva última lectura
   */
  operarElectrovalvula() {
    this.estadoEv = this.estadoEv ? 0 : 1;
    this.sendmsg(this.electrovalvulaTopic, this.estadoEv.toString());
    this.dispositivoServ.postElectrovalvula(+this.estadoEv, this.dispositivo.electrovalvulaId);
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

  /**
   * Publico el mensaje en el tópico indicado
   * @param topic String
   * @param message String
   */
  sendmsg(topic, message): void {
    this.mqttService.unsafePublish(topic, message, { qos: 1, retain: true });
  }

  /**
   * Genero los tópicos acorde al id del dispositivo y me suscribo al tópico correspondiente
   */
  suscription(): void {
    this.subscriptionTopic = this.id+'/sensor';
    this.electrovalvulaTopic = this.id+'/actuador';
    // this.responsePayload = this.id+'/sensor';

    this.subscription = this.mqttService.observe(this.subscriptionTopic).subscribe((message: IMqttMessage) => {
      this.msg = message.payload.toString();
      console.log(this.msg);
      
      // separo datos del mensaje JSON recibido para actualizar los gauges
      let obj = JSON.parse(this.msg);
      console.log(obj);
      this.updateChart(obj.temp, obj.hum);
    });
  }

}
