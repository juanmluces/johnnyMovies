import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Themes } from '../interfaces/enums';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';
import { ObservablesService } from '../services/observables.service';

@Component({
  selector: 'app-tab-settings',
  templateUrl: './tab-settings.page.html',
  styleUrls: ['./tab-settings.page.scss'],
})
export class TabSettingsPage implements OnInit {

  theme: Themes = Themes.DarkBlue;
  mostrarGenero: boolean = false;
  tabTitle = "tabs.settings";
  themesEnum: typeof Themes = Themes;

  constructor(private dataLocal: DataLocalService, public translate: TranslateService, private observables: ObservablesService) {
  }
  
  async ngOnInit(){
    
    [this.theme, this.mostrarGenero] = await Promise.all([this.dataLocal.recuperarModoOscuro(), this.dataLocal.recuperarMostrarGeneros()])
    this.selectTheme(this.theme)
    // if(this.theme) document.body.classList.add('dark');
    this.observables.setTabTitle(this.tabTitle);


  }

  ionViewWillEnter(){
    this.observables.setShowBackButton(true);
  }

  selectTheme(theme: Themes):void{
    if(theme === Themes.DarkBlue){
      document.body.classList.remove('green');
      document.body.classList.add('dark');
      return
    }
    if(theme === Themes.LightWhite) return document.body.classList.remove('dark', 'green');
    if(theme === Themes.DarkGreen) return document.body.classList.add('dark', 'green');

  }



  

  changeLang(event){
    const value: string = event.detail.value;
    this.dataLocal.guardarIdioma(value)
    this.translate.use(value)
  }

  changeTheme(event: any ){
    console.log(event.detail)
    this.theme = event.detail.value;
    this.selectTheme(this.theme)
    this.dataLocal.guardarModoOscuro(this.theme)

    // this.theme ? document.body.classList.add('dark') : document.body.classList.remove('dark');
    // if(this.darkMode){
      // document.body.classList.remove('light')
      // document.body.classList.add('dark')
    // } else{
      // document.body.classList.add('light')
      // document.body.classList.remove('dark')
    // }
    
  }

  changeShowGenero(){
    this.dataLocal.guardarMostrarGeneros(this.mostrarGenero)
  }

}
