import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditDispositivoPageRoutingModule } from './edit-dispositivo-routing.module';

import { EditDispositivoPage } from './edit-dispositivo.page';
import { ReactiveFormsModule } from "@angular/forms";



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditDispositivoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditDispositivoPage]
})
export class EditDispositivoPageModule {}
