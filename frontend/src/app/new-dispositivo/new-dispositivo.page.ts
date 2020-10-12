import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { DispositivoService } from '../services/dispositivo.service';

@Component({
  selector: 'app-new-dispositivo',
  templateUrl: './new-dispositivo.page.html',
  styleUrls: ['./new-dispositivo.page.scss'],
})
export class NewDispositivoPage implements OnInit {

  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private dispositivoServ: DispositivoService) { }

  ngOnInit() {
    this.crearForm();
  }

  private crearForm() {
    this.formGroup = this.formBuilder.group({
      clientId: ['', Validators.required],
      nombre: ['', Validators.required],
      ubicacion: ['', Validators.required]
    })
  }

  public guardarDispositivo() {
    let obj = this.formGroup.value;
    this.dispositivoServ.nuevoDispositivo(obj);

  }

}
