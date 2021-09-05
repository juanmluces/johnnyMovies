import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CloseModalGuard } from '../services/close-modal-guard';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
    canDeactivate: [CloseModalGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
