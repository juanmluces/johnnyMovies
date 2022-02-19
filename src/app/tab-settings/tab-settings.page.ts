import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';
import { ObservablesService } from '../services/observables.service';

@Component({
  selector: 'app-tab-settings',
  templateUrl: './tab-settings.page.html',
  styleUrls: ['./tab-settings.page.scss'],
})
export class TabSettingsPage implements OnInit {

  darkMode: boolean = false;
  mostrarGenero: boolean = false;
  tabTitle = "tabs.settings"

  constructor(private dataLocal: DataLocalService, public translate: TranslateService, private observables: ObservablesService) {
  }
  
  async ngOnInit(){
    
    [this.darkMode, this.mostrarGenero] = await Promise.all([this.dataLocal.recuperarModoOscuro(), this.dataLocal.recuperarMostrarGeneros()])
    if(this.darkMode) document.body.classList.add('dark');
    this.observables.setTabTitle(this.tabTitle);


  }

  ionViewWillEnter(){
    this.observables.setShowBackButton(true);
  }



  

  changeLang(event){
    const value: string = event.detail.value;
    this.dataLocal.guardarIdioma(value)
    this.translate.use(value)
  }

  changeMode(){
    this.darkMode ? document.body.classList.add('dark') : document.body.classList.remove('dark');
    // if(this.darkMode){
      // document.body.classList.remove('light')
      // document.body.classList.add('dark')
    // } else{
      // document.body.classList.add('light')
      // document.body.classList.remove('dark')
    // }
    this.dataLocal.guardarModoOscuro(this.darkMode)
    
  }

  changeShowGenero(){
    this.dataLocal.guardarMostrarGeneros(this.mostrarGenero)
  }

}
