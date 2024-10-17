import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavbarPage } from './navbar.page';

const routes: Routes = [
  {
    path: '',
    component: NavbarPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../categories/categories.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'historique',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../historique/historique.module').then(m => m.HistoriquePageModule)
          }
        ]
      },
      {
        path: 'detection',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../detection/detection.module').then(m => m.DetectionPageModule)
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NavbarPageRoutingModule {}
