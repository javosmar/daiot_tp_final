import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewDispositivoPageRoutingModule } from './new-dispositivo-routing.module';

import { NewDispositivoPage } from './new-dispositivo.page';

import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewDispositivoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NewDispositivoPage]
})
export class NewDispositivoPageModule {}
