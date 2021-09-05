import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataLocalService } from './services/data-local.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private dataLocal: DataLocalService, 
    private translate: TranslateService
    ) {
    this.initializeApp();
    this.translate.setDefaultLang('es')
    
  }
  
  async initializeApp() {
    this.changeDarkMode();
    const lang = await this.dataLocal.getLang() || this.translate.getDefaultLang()
    this.translate.use(lang)
  }

  async changeDarkMode(){

    const darkMode = await this.dataLocal.recuperarModoOscuro()
    document.body.classList.add(darkMode ? 'dark' : 'light')
     }
    
}
