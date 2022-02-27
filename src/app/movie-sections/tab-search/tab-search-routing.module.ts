import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CloseModalGuard } from '../../services/close-modal-guard';
import { TabSearchPage } from './tab-search.page';

const routes: Routes = [
  {
    path: '',
    component: TabSearchPage,
    canDeactivate: [CloseModalGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabSearchRoutingModule {}
