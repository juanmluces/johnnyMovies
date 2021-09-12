import { Component, OnInit } from '@angular/core';
import { ObservablesService } from '../services/observables.service';

@Component({
  selector: 'app-tab-about',
  templateUrl: './tab-about.page.html',
  styleUrls: ['./tab-about.page.scss'],
})
export class TabAboutPage implements OnInit {

  tabTitle = 'tabs.about'

  constructor(private observables: ObservablesService) { }

  ngOnInit() {
    this.observables.setTabTitle(this.tabTitle)
    
  }

  ionViewWillEnter(){
    this.observables.setTabTitle(this.tabTitle)
 
  }

  navigateWeb(site: string){
    window.open(site, "_system");
  }

}
