import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appColorBoton]'
})
export class ColorBotonDirective {

  /**
   * Cambio el atributo 'color' del elemento recibido
   */
  constructor(private el: ElementRef) { 
    el.nativeElement.setAttribute('color','danger');
  }

}
