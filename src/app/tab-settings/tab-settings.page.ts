import { Component, OnInit } from '@angular/core';
import { DataLocalService } from '../services/data-local.service';

@Component({
  selector: 'app-tab-settings',
  templateUrl: './tab-settings.page.html',
  styleUrls: ['./tab-settings.page.scss'],
})
export class TabSettingsPage implements OnInit {

  darkMode: boolean = false;
  mostrarGenero: boolean = true;

  constructor(private dataLocal: DataLocalService) {
  }
  
  async ngOnInit(){
    this.darkMode = await this.dataLocal.recuperarModoOscuro()
    this.mostrarGenero = await this.dataLocal.recuperarMostrarGeneros()

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
