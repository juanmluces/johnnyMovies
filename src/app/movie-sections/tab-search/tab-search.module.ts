import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabSearchPage } from './tab-search.page';

import { TabSearchRoutingModule } from './tab-search-routing.module';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabSearchRoutingModule,
    PipesModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [TabSearchPage]
})
export class TabSearchPageModule {}
