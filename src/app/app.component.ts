import { Component, OnInit } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DataLocalService } from './services/data-local.service';
import { ObservablesService } from './services/observables.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{


  tabTitle: string;


  constructor(
    private dataLocal: DataLocalService, 
    private translate: TranslateService,
    private platform: Platform,
    public alertController: AlertController,
    private observables: ObservablesService
    ) {
    this.initializeApp();
    this.translate.setDefaultLang('es')
    this.tabTitle = observables.getTabTitle()
    
  }

  ngOnInit(){
    this.observables.tabTitleObservable().subscribe( title => this.tabTitle = title)
  }
  
  async initializeApp() {

    

    this.platform.backButton.subscribeWithPriority(0, async () => {
      
      
      await this.presentAlertConfirm()
      
    
     
   });
    
    this.changeDarkMode();
    const lang = await this.dataLocal.getLang() || this.translate.getDefaultLang()
    this.translate.use(lang)
  }

  async changeDarkMode(){

    const darkMode = await this.dataLocal.recuperarModoOscuro()
    document.body.classList.add(darkMode ? 'dark' : 'light')
     }

     async presentAlertConfirm() {

      const exitTrans = await this.translate.get('closeApp.exit').toPromise()
      const exitQuestionTrans = await this.translate.get('closeApp.exitApp').toPromise()
      const cacelTrans = await this.translate.get('closeApp.cancel').toPromise()
  



      
      const alert = await this.alertController.create({
        header: exitTrans,
        message: exitQuestionTrans,
        buttons: [
          {
            text: cacelTrans,
            role: 'cancel',
            cssClass: 'secondary',
          }, {
            text: exitTrans,
            cssClass: 'exit-button',
            handler: () => {
              console.log('Confirm Okay');
              navigator['app'].exitApp();
            }
          }
        ]
      });
  
      await alert.present();
    }
  
    
}
