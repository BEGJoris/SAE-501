import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 {
  path: '',
  loadChildren: () => import('./navbar/navbar.module').then( m => m.NavbarPageModule)
 },  {
    path: 'detection',
    loadChildren: () => import('./detection/detection.module').then( m => m.DetectionPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
