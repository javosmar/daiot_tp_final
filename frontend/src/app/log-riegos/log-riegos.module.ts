import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogRiegosPageRoutingModule } from './log-riegos-routing.module';

import { LogRiegosPage } from './log-riegos.page';
import { FormatoFechaPipe } from '../pipes/formato-fecha.pipe';
import { FormatoRiegoPipe } from "../pipes/formato-riego.pipe";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogRiegosPageRoutingModule
  ],
  declarations: [LogRiegosPage, FormatoFechaPipe, FormatoRiegoPipe]
})
export class LogRiegosPageModule {}
