import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewDispositivoPage } from './new-dispositivo.page';

const routes: Routes = [
  {
    path: '',
    component: NewDispositivoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewDispositivoPageRoutingModule {}
