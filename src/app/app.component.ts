import { Component } from '@angular/core';
import { DataLocalService } from './services/data-local.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private dataLocal: DataLocalService) {
    this.initializeApp();
  }

  initializeApp() {
    this.changeDarkMode();
  }

  async changeDarkMode(){

    const darkMode = await this.dataLocal.recuperarModoOscuro()
    document.body.classList.add(darkMode ? 'dark' : 'light')
     }
    
}
