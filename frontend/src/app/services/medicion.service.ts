import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Medicion } from '../model/Medicion';
import { Riego } from '../model/Riego';

@Injectable({
  providedIn: 'root'
})
export class MedicionService {

  private url = 'http://localhost:8000';

  constructor(private httpServ: HttpClient) { }

  /**
   * Obtiene la lectura más reciente de un dispositivo
   * @param id El ID del dispositivo
   * @returns Una promesa donde se devuelve la medición
   */
  getMedicion(id): Promise<Medicion> {
    const url = `${this.url}/api/medicion/${id}`;
    return this.httpServ.get(url).toPromise().then((objeto: Medicion) => {
      return objeto;
    }).catch((err) => {
      console.log('Error en la consulta');
      return null;
    });
  }

  /**
   * Obtiene todas las mediciones de un dispositivo
   * @param id Id del dispositivo
   * @returns Una promesa donde se devuelve Medicion[]
   */
  getMediciones(id): Promise<Medicion[]> {
    const url = `${this.url}/api/medicion/todas/${id}`;
    return this.httpServ.get(url).toPromise().then((objeto: Medicion) => {
      return objeto;
    }).catch((err) => {
      console.log('Error en la consulta');
      return null;
    });
  }

  /**
   * Obtiene el log de riegos de un dispositivo
   * @param id Id del dispositivo
   * @returns Una promesa donde se devuelve Riego[]
   */
  getRiegos(id): Promise<Riego[]> {
    const url = `${this.url}/api/medicion/riegos/${id}`;
    return this.httpServ.get(url).toPromise().then((objeto: Riego) => {
      return objeto;
    }).catch((err) => {
      console.log('Error en la consulta');
      return null;
    });
  }

  /**
   * Envía una medición para ser almacenada
   * @param medicion Medición a almacenar en DB
   */
  // postMedicion(medicion: Medicion) {
  postMedicion(valor: number, id: number) {
    const url = `${this.url}/api/medicion`;
    const dato = {
      fecha: new Date(),
      valor,
      id
    };
    return this.httpServ.post(url, dato).toPromise().then((result) => {
      return result;
    });
  }

}
