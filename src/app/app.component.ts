import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OneSignal } from '@ionic-native/onesignal/ngx';
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
    private observables: ObservablesService,
    private router: Router,
    private oneSignal: OneSignal
    ) {
    this.initializeApp();
    this.translate.setDefaultLang('es')
    this.tabTitle = observables.getTabTitle()
    
  }

  ngOnInit(){
    this.observables.tabTitleObservable().subscribe( title => this.tabTitle = title)
  }
  
  async initializeApp() {

      if(this.platform.is('cordova')){
        this.setPush()
      }

    this.platform.backButton.subscribeWithPriority(0, async () => {
      console.log('button pressed');
      
      this.observables.backButtonPressed(true)
      setTimeout(()=>{this.observables.backButtonPressed(false)}, 0)
      const url = this.router.url
      if(url.includes("/movies/")){
        if(this.router.url == "/movies/tab1"){
          await this.presentAlertConfirm()
        } else{
          await this.router.navigate(['movies', 'tab1'])
        }
        
      }
      // console.log('this.router.url', this.router.url);
      
    
     
   });
    
    this.changeDarkMode();
    const lang = await this.dataLocal.getLang() || this.translate.getDefaultLang()
    this.translate.use(lang)
  }

  setPush(){

    
    this.oneSignal.startInit('7051f6b9-2cb7-4bc8-942e-300a05bedf32', '1071676804015');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);

    this.oneSignal.handleNotificationReceived().subscribe(data => {

      let msg = data.payload.body;
      let title = data.payload.title;
      let additionalData = data.payload.additionalData;
      const task = additionalData.info ?? ''
      this.showAlert(title, msg, task)
    });


    this.oneSignal.handleNotificationOpened().subscribe(data => {

      
      let additionalData = data.notification.payload.additionalData;
     
      const task = additionalData.info ?? ''
      this.showAlert('Notificacion abierta', 'Mas cosas', task)


    });
  
    this.oneSignal.endInit();
  }

  async showAlert(title, msg, task){
    const alert = await this.alertController.create({
      header: title,
      subHeader: msg,
      buttons: [
        {
          text: `Action: ${task}`,
          handler: () => {
            // navigate
          }
        }
      ]
    })
    await alert.present();
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
