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
  array;
  habilitado: boolean = false;

  constructor(private formBuilder: FormBuilder, private dispositivoServ: DispositivoService) { }

  ngOnInit() {
    this.crearForm();
  }

  async ionViewWillEnter(): Promise<void> {
    this.array = await this.dispositivoServ.getListadoTodos();
  }

  private crearForm() {
    this.formGroup = this.formBuilder.group({
      clientId: ['', Validators.required],
      nombre: ['', Validators.required],
      ubicacion: ['', Validators.required]
    })
  }

  private limpiarForm() {
    this.formGroup.patchValue({
      clientId: '',
      nombre: '',
      ubicacion: ''
    })
  }

  public guardarDispositivo() {
    let obj = this.formGroup.value;
    this.dispositivoServ.nuevoDispositivo(obj);
  }

  habilitarDevice(i) {
    this.array[i].habilitado = this.array[i].habilitado ? 0:1;
    this.dispositivoServ.editarDispositivo(this.array[i]);
  }

}
