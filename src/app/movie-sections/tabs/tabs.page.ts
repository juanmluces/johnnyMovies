import { Component, OnInit } from '@angular/core';
import { Themes } from 'src/app/interfaces/enums';
import { DataLocalService } from '../../services/data-local.service';
import { ObservablesService } from '../../services/observables.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  theme: Themes = Themes.LightCloud;
  tabTitle = 'header.movies'

  constructor(private dataLocal: DataLocalService, private observables: ObservablesService) {
  }
  
  async ngOnInit(){
    this.theme = await this.dataLocal.getTheme()
    this.observables.setTabTitle(this.tabTitle)
 
    
    
  }
  
  ionViewWillEnter(){
    this.observables.setTabTitle(this.tabTitle);
    this.observables.setShowBackButton(false);
 
  }

  


}
 