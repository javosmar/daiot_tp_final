import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DispositivoService } from '../services/dispositivo.service';
import { Dispositivo } from "../model/Dispositivo";


@Component({
  selector: 'app-edit-dispositivo',
  templateUrl: './edit-dispositivo.page.html',
  styleUrls: ['./edit-dispositivo.page.scss'],
})
export class EditDispositivoPage implements OnInit {

  public formGroup: FormGroup;
  private dispositivo;

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder, 
    private dispositivoServ: DispositivoService
    ) { }

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

  private limpiarForm() {
    this.formGroup.patchValue({
      clientId: '',
      nombre: '',
      ubicacion: ''
    })
  }

  public guardarDispositivo() {
    this.dispositivo.clientId = this.formGroup.get("clientId").value;
    this.dispositivo.nombre = this.formGroup.get("nombre").value;
    this.dispositivo.ubicacion = this.formGroup.get("ubicacion").value;
    this.dispositivoServ.editarDispositivo(this.dispositivo);
  }

  async ionViewWillEnter() {
    const idDispositivo = +this.route.snapshot.paramMap.get('id');
    this.dispositivo = await this.dispositivoServ.getDispositivo(idDispositivo);
    this.formGroup.patchValue({
      clientId: this.dispositivo.clientId,
      nombre: this.dispositivo.nombre,
      ubicacion: this.dispositivo.ubicacion
    });
  }

}
