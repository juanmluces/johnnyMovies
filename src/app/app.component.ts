import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { AlertController, IonMenu, NavController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Themes } from './interfaces/enums';
import { DataLocalService } from './services/data-local.service';
import { ObservablesService } from './services/observables.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {


  tabTitle: string;
  backButton: boolean;


  constructor(
    private dataLocal: DataLocalService,
    private translate: TranslateService,
    private platform: Platform,
    public alertController: AlertController,
    private observables: ObservablesService,
    private router: Router,
    private oneSignal: OneSignal,
    private navCtrl: NavController
  ) {
    this.initializeApp();
    this.translate.setDefaultLang('es')
    this.tabTitle = observables.getTabTitle()
    this.backButton = false;

  }

  ngOnInit() {
    this.observables.tabTitleObservable().subscribe(title => this.tabTitle = title);
    this.observables.getShowBackButton$().subscribe(show => this.backButton = show);
  }

  async initializeApp() {

    if (this.platform.is('cordova')) {
      this.setPush()
    }

    this.platform.backButton.subscribeWithPriority(0, async () => {
   

      this.observables.backButtonPressed(true)
      setTimeout(() => { this.observables.backButtonPressed(false) }, 0)
      const url = this.router.url
      if (url.includes("/movies/")) {
        if (this.router.url == "/movies/tab1") {
          await this.presentAlertConfirm()
        } else {
          await this.router.navigate(['movies', 'tab1'])
        }

      }
      // console.log('this.router.url', this.router.url);



    });

    this.changeTheme();
    const lang = await this.dataLocal.getLang() || this.translate.getDefaultLang()
    this.translate.use(lang)
  }

  setPush() {


    this.oneSignal.startInit('7051f6b9-2cb7-4bc8-942e-300a05bedf32', '1071676804015');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);

    this.oneSignal.handleNotificationReceived().subscribe(async data => {
      if (!data?.payload?.additionalData) return

      const additionalData = data.payload.additionalData;
      const title = await this.translate.get(additionalData.title).toPromise();
      const version = additionalData.version ?? ''
      const update = await this.translate.get(additionalData.update ?? '').toPromise()
      const newVersion = await this.translate.get(additionalData.newVersion ?? '').toPromise()
      const msg = newVersion + ' ' + version;
      const task = { version, update, newVersion }
      await this.showAlert(title, msg, task)
    });


    this.oneSignal.handleNotificationOpened().subscribe(async data => {
      if (!data?.notification?.payload?.additionalData) return


      const additionalData = data.notification.payload.additionalData;
      const title = await this.translate.get(additionalData.title).toPromise();
      const version = additionalData.version ?? ''
      const update = await this.translate.get(additionalData.update ?? '').toPromise()
      const newVersion = await this.translate.get(additionalData.newVersion ?? '').toPromise()
      const msg = newVersion + ' ' + version;
      const task = { version, update, newVersion }
      await this.showAlert(title, msg, task)


    });

    this.oneSignal.endInit();
  }

  async showAlert(title, msg, task) {
    const cancelMsg = await this.translate.get('notification.notNow').toPromise()
    const alert = await this.alertController.create({
      header: title,
      subHeader: msg,
      buttons: [
        {
          text: cancelMsg,
          role: 'cancel',
          handler: async () => {
            this.oneSignal.clearOneSignalNotifications()
            await alert.dismiss()

          }
        },
        {
          text: `${task.update}`,
          handler: () => {
            this.oneSignal.clearOneSignalNotifications()
            window.open('https://play.google.com/store/apps/details?id=com.codignlights.johnnymovies', '_system', 'location=yes');
          }
        }
      ]
    })
    await alert.present();
  }

  async changeTheme() {

    const theme = await this.dataLocal.getTheme();
    this.selectTheme(theme);

    // if(darkMode) document.body.classList.add('dark');
    // document.body.classList.add(darkMode ? 'dark' : '')
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
            // console.log('Confirm Okay');
            navigator['app'].exitApp();
          }
        }
      ]
    });

    await alert.present();
  }

  selectTheme(theme: Themes):void{
    if(theme === Themes.DarkOcean){
      document.body.classList.remove('green');
      document.body.classList.add('dark');
      return
    }
    if(theme === Themes.LightCloud) return document.body.classList.remove('dark', 'green');
    if(theme === Themes.DarkForest) return document.body.classList.add('dark', 'green');

  }

  async navigate(route: string, sidemenu:IonMenu){
    await sidemenu.close()
    this.navCtrl.navigateForward(route)
  }


}
