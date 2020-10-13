import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoRiego'
})
export class FormatoRiegoPipe implements PipeTransform {

  transform(value: boolean): string {
    const riego = value ? "Abierto" : "Cerrado";
    return riego;
  }

}
