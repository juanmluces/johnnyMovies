import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CloseModalGuard } from '../../services/close-modal-guard';
import { TabHomePage } from './tab-home.page';

const routes: Routes = [
  {
    path: '',
    component: TabHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabHomeRoutingModule {}
