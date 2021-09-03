import { Component, OnInit } from '@angular/core';
import { DataLocalService } from '../services/data-local.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  darkMode: boolean = false;

  constructor(private dataLocal: DataLocalService) {
  }
  
  async ngOnInit(){
    this.darkMode = await this.dataLocal.recuperarModoOscuro()

  }

  changeMode(){
 
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');
    this.dataLocal.guardarModoOscuro(this.darkMode)
    
  }
}
 