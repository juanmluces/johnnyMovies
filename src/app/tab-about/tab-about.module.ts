import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabAboutPageRoutingModule } from './tab-about-routing.module';

import { TabAboutPage } from './tab-about.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabAboutPageRoutingModule,
    TranslateModule
  ],
  declarations: [TabAboutPage]
})
export class TabAboutPageModule {}
