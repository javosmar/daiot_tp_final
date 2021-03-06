import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'dispositivo/:id',
    loadChildren: () => import('./dispositivo/dispositivo.module').then( m => m.DispositivoPageModule)
  },
  {
    path: 'mediciones/:id',
    loadChildren: () => import('./mediciones/mediciones.module').then( m => m.MedicionesPageModule)
  },
  {
    path: 'log-riegos/:id',
    loadChildren: () => import('./log-riegos/log-riegos.module').then( m => m.LogRiegosPageModule)
  },
  {
    path: 'new-dispositivo',
    loadChildren: () => import('./new-dispositivo/new-dispositivo.module').then( m => m.NewDispositivoPageModule)
  },
  {
    path: 'edit-dispositivo/:id',
    loadChildren: () => import('./edit-dispositivo/edit-dispositivo.module').then( m => m.EditDispositivoPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
