import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        //loadChildren: '../tab1/tab1.module#Tab1PageModule'
        loadChildren: () =>
              import('../tab1/tab1.module').then(m => m.Tab1PageModule)

     
          
      },

      

      {
        path: 'tab2',
        //loadChildren: '../tab2/tab2.module#Tab2PageModule'
        loadChildren: () =>
              import('../tab2/tab2.module').then(m => m.Tab2PageModule)
          
      },
      {
        path: 'tab3',
        //loadChildren: '../tab3/tab3.module#Tab3PageModule'
        loadChildren: () =>
              import('../tab3/tab3.module').then(m => m.Tab3PageModule)
          
      },
      {
        path: 'tab4',
        //loadChildren: '../tab3/tab3.module#Tab3PageModule'
        loadChildren: () =>
              import('../tab4/tab4.module').then(m => m.Tab4PageModule)
          
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
