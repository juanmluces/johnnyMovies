import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CloseModalGuard } from '../services/close-modal-guard';
import { Tab2Page } from './tab2.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2Page,
    canDeactivate: [CloseModalGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
