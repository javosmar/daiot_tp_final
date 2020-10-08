import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoFecha'
})
export class FormatoFechaPipe implements PipeTransform {

  transform(value: string): string {
    const newFecha = new Date(value).toISOString().replace(/T/, ' ').replace(/\..+/, '');
    return newFecha;
  }

}
