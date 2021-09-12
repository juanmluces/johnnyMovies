import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./movie-sections/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tab-settings',
    loadChildren: () => import('./tab-settings/tab-settings.module').then( m => m.TabSettingsPageModule)
  },
  {
    path: 'tab-about',
    loadChildren: () => import('./tab-about/tab-about.module').then( m => m.TabAboutPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
