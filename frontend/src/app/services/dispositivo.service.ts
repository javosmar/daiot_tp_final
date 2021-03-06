import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dispositivo } from '../model/Dispositivo';
import { Riego } from '../model/Riego';
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
  getListadoTodos(): Promise<Dispositivo[]> {
    const url = this.url + '/api/dispositivo/todos';
    return this.httpServ.get(url).toPromise().then((objeto: Dispositivo) => {
      return objeto;
    }).catch((err) => {
      console.log('Error en la consulta');
      return null;
    });
  }

  /**
   * Obtiene los dispositivos habilitados
   */
  getListadoHabilitados(): Promise<Dispositivo[]> {
    const url = this.url + '/api/dispositivo/habilitados';
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
      return new Dispositivo('a', 1, 'a', 'a', false, 1);
    });
  }

  /**
   * Crea un nuevo dispositivo y lo envía a la API para ser almacenado
   */
  nuevoDispositivo(obj) {
    const url = this.url + '/api/dispositivo/new_device';
    return this.httpServ.post(url, obj).toPromise().then((result) => {
      return result;
    });
  }

  /**
   * Edita un dispositivo y lo envía a la API para ser almacenado
   */
  editarDispositivo(obj) {
    const url = `${this.url}/api/dispositivo/update/${obj.dispositivoId}`;
    return this.httpServ.put(url, obj).toPromise().then((result) => {
      return result;
    });
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

  /**
   * Obtiene el estado más reciente de una electroválvula
   * @param id El ID del dispositivo
   * @returns Una promesa donde se devuelve el etado booleano
   */
  getEstadoEv(id): Promise<number> {
    const url = `${this.url}/api/dispositivo/riego/${id}`;
    return this.httpServ.get(url).toPromise().then((objeto: Riego) => {
      return objeto.apertura;
    }).catch((err) => {
      console.log('Error en la consulta');
      return null;
    });
  }

}
