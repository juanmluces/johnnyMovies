import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab-settings',
  templateUrl: './tab-settings.page.html',
  styleUrls: ['./tab-settings.page.scss'],
})
export class TabSettingsPage implements OnInit {

  darkMode: boolean = false;
  mostrarGenero: boolean = false;

  constructor(private dataLocal: DataLocalService, public translate: TranslateService) {
  }
  
  async ngOnInit(){
    
    [this.darkMode, this.mostrarGenero] = await Promise.all([this.dataLocal.recuperarModoOscuro(), this.dataLocal.recuperarMostrarGeneros()])
    // this.darkMode = await this.dataLocal.recuperarModoOscuro()
    // this.mostrarGenero = await this.dataLocal.recuperarMostrarGeneros()

  }
  

  

  changeLang(event){
    const value: string = event.detail.value;
    this.dataLocal.guardarIdioma(value)
    this.translate.use(value)
  }

  changeMode(){
 
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');
    this.dataLocal.guardarModoOscuro(this.darkMode)
    
  }

  changeShowGenero(){
    this.dataLocal.guardarMostrarGeneros(this.mostrarGenero)
  }

}
