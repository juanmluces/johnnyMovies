import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ObservablesService } from '../services/observables.service';

@Component({
  selector: 'app-tab-about',
  templateUrl: './tab-about.page.html',
  styleUrls: ['./tab-about.page.scss'],
})
export class TabAboutPage implements OnInit {

  tabTitle = 'tabs.about'
  appVersion = environment.appVersion
  ionicVersion = environment.ionicVersion
  angularVersion = environment.angularVersion

  constructor(private observables: ObservablesService) { }

  ngOnInit() {
    // this.observables.setTabTitle(this.tabTitle)
    
  }

  ionViewWillEnter(){
    this.observables.setTabTitle(this.tabTitle)
    this.observables.setShowBackButton(true);
  }


  navigateWeb(site: string){
    window.open(site, "_system");
  }

}
