import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CloseModalGuard } from '../../services/close-modal-guard';
import { TabFavoritePage } from './tab-favorite.page';

const routes: Routes = [
  {
    path: '',
    component: TabFavoritePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabFavoritePageRoutingModule {}
