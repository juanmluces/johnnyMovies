import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { ActionSheetOptions } from '@ionic/core';
import { TranslateService } from '@ngx-translate/core';
import { Themes } from '../interfaces/enums';
import { DataLocalService } from '../services/data-local.service';
import { ObservablesService } from '../services/observables.service';

@Component({
  selector: 'app-tab-settings',
  templateUrl: './tab-settings.page.html',
  styleUrls: ['./tab-settings.page.scss'],
})
export class TabSettingsPage implements OnInit {

  theme: Themes = Themes.LightCloud;
  mostrarGenero: boolean = false;
  tabTitle = "tabs.settings";
  themesEnum: typeof Themes = Themes;

  constructor(
    private dataLocal: DataLocalService, 
    public translate: TranslateService, 
    private observables: ObservablesService,
    private actionSheetController: ActionSheetController
    ) {
  }
  
  async ngOnInit(){
    
    [this.theme, this.mostrarGenero] = await Promise.all([this.dataLocal.getTheme(), this.dataLocal.getShowGenres()])
    this.setTheme(this.theme)
    
    
  }
  
  ionViewWillEnter(){
    this.observables.setTabTitle(this.tabTitle);
    this.observables.setShowBackButton(true);
  }

  setTheme(theme: Themes):void{
    if(theme === Themes.DarkOcean){
      document.body.classList.remove('green');
      document.body.classList.add('dark');
      return
    }
    if(theme === Themes.LightCloud) return document.body.classList.remove('dark', 'green');
    if(theme === Themes.DarkForest) return document.body.classList.add('dark', 'green');

  }



  

  changeLang(lang: string){
    this.dataLocal.setLang(lang)
    this.translate.use(lang)
  }

  changeTheme(theme: Themes ){
    this.theme = theme;
    this.setTheme(this.theme);
    this.dataLocal.saveTheme(this.theme);

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
    this.dataLocal.setShowGenres(this.mostrarGenero)
  }

  async selectTheme(){
    
    const config: ActionSheetOptions = {
      cssClass: "themeActionSheet",
      header: this.translate.instant("tab-settings.chooseTheme"),
      subHeader:  this.translate.instant("tab-settings.theme" + this.theme),
      mode: 'md',
      buttons: [
        {
          cssClass: "iconoIdioma first-button",
          text: this.translate.instant("tab-settings.lightCloud"),
          icon: "cl-cloud",
          handler: () => this.changeTheme(Themes.LightCloud)
        },
        {
          cssClass: "iconoIdioma",
          text: this.translate.instant('tab-settings.darkOcean'),
          icon: "cl-water",
          handler: () => this.changeTheme(Themes.DarkOcean)
        },
        {
          cssClass: "iconoIdioma last-button",
          text: this.translate.instant('tab-settings.darkForest'),
          icon: "cl-forest",
          handler: () => this.changeTheme(Themes.DarkForest)
        },
      ]
    }
    const actionSheet = await this.actionSheetController.create(config);
    await actionSheet.present();

  }

  async selectLanguage(){
    const config: ActionSheetOptions = {
      cssClass: "cssIdioma",
      header: this.translate.instant("tab-settings.chooseLanguage"),
      subHeader:  this.translate.instant("tab-settings." + this.translate.currentLang),
      mode: 'md',
      buttons: [
        {
          cssClass: "iconoIdioma first-button",
          text: this.translate.instant("tab-settings.es"),
          icon: "flag-outline",
          handler: () => this.changeLang('es')
        },
        {
          cssClass: "iconoIdioma last-button",
          text: this.translate.instant("tab-settings.en"),
          icon: "flag-outline",
          handler: () => this.changeLang('en')
        },
      ]
    }
    const actionSheet = await this.actionSheetController.create(config);
    await actionSheet.present();

  }

}
