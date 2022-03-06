import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabFavoritePage } from './tab-favorite.page';

import { TabFavoritePageRoutingModule } from './tab-favorite-routing.module';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: TabFavoritePage }]),
    TabFavoritePageRoutingModule,
    ComponentsModule,
    TranslateModule,
    PipesModule
  ],
  declarations: [TabFavoritePage]
})
export class TabFavoritePageModule {}
