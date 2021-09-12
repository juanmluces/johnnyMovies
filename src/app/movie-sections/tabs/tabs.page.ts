import { Component, OnInit } from '@angular/core';
import { DataLocalService } from '../../services/data-local.service';
import { ObservablesService } from '../../services/observables.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  darkMode: boolean = false;
  tabTitle = 'header.movies'

  constructor(private dataLocal: DataLocalService, private observables: ObservablesService) {
  }
  
  async ngOnInit(){
    this.darkMode = await this.dataLocal.recuperarModoOscuro()
    this.observables.setTabTitle(this.tabTitle)
 
    
    
  }
  
  ionViewWillEnter(){
    this.observables.setTabTitle(this.tabTitle)
 
  }

  


}
 