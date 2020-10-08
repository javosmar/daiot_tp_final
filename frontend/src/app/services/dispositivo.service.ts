import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dispositivo } from '../model/Dispositivo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {

  constructor(private httpServ: HttpClient) { }

  private url = 'http://localhost:8000';

  /**
   * Obtiene todos los dispositivos
   */
  getListado(): Promise<Dispositivo[]> {
    const url = this.url + '/api/dispositivo/todos';
    return this.httpServ.get(url).toPromise().then((objeto: Dispositivo) => {
      return objeto;
    }).catch((err) => {
      console.log('Error en la consulta');
      return null;
    });
  }

  /**
   * Obtiene los datos del dispositivo
   * @param id Id del dispositivo
   */
  getDispositivo(id): Promise<Dispositivo> {
    const url = this.url + '/api/dispositivo/' + id;
    return this.httpServ.get(url).toPromise().then((objeto: Dispositivo) => {
      return objeto;
    }).catch((err) => {
      console.log('Error en la consulta');
      return new Dispositivo(1, 'a', 'a', 1);
    });
  }

  /**
   * Crea un nuevo dispositivo y lo envía a la API para ser almacenado
   */
  insertarUno() {
    const url = this.url + '/api/dispositivo';
    this.httpServ.post(this.url, { nombre: "Martin", apellido: "Acosta" });
  }

  /**
   * Envía por POST el id de electroválvula para insertar un nuevo registro en la tabla Log_Riegos
   * @param apertura Valor para indicar la apertura o clausura de la electroválvula
   * @param electrovalvulaId Dispositivo desde el que se ejecuta la acción
   */
  postElectrovalvula(apertura: number, electrovalvulaId: number) {
    const dato = {
      apertura,
      fecha: new Date(),
      electrovalvulaId
    }
    const url = this.url + '/api/dispositivo/electrovalvula';
    return this.httpServ.post(url, dato).toPromise().then((result) => {
      return result;
    });
  }

}
