import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'movies',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab-home/tab-home.module').then(m => m.TabHomePageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab-search/tab-search.module').then(m => m.TabSearchPageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab-favorite/tab-favorite.module').then(m => m.TabFavoritePageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../../tab-settings/tab-settings.module').then(m => m.TabSettingsPageModule)
      },
      {
        path: '',
        redirectTo: '/movies/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/movies/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
