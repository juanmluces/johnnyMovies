import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'movies',
    component: TabsPage,
    children: [
      {
        path: 'tab-home',
        loadChildren: () => import('../tab-home/tab-home.module').then(m => m.TabHomePageModule)
      },
      {
        path: 'tab-search',
        loadChildren: () => import('../tab-search/tab-search.module').then(m => m.TabSearchPageModule)
      },
      {
        path: 'tab-favorite',
        loadChildren: () => import('../tab-favorite/tab-favorite.module').then(m => m.TabFavoritePageModule)
      },
      {
        path: '',
        redirectTo: '/movies/tab-home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/movies/tab-home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
