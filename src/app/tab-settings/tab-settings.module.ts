import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabSettingsPageRoutingModule } from './tab-settings-routing.module';

import { TabSettingsPage } from './tab-settings.page';
import { ComponentsModule } from '../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabSettingsPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [TabSettingsPage]
})
export class TabSettingsPageModule {}
