import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabHomePage } from './tab-home.page';

import { TabHomeRoutingModule } from './tab-home-routing.module';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabHomeRoutingModule,
    PipesModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [TabHomePage]
})
export class TabHomePageModule {}
