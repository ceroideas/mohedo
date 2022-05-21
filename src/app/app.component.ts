import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { OneSignal } from '@ionic-native/onesignal/ngx';

import {TranslateService} from '@ngx-translate/core';

import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private oneSignal: OneSignal,
    public translate: TranslateService,
    public nav: NavController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private api: ApiService,
  ) {

    translate.setDefaultLang('es');
    translate.use('es');

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(/*async*/ () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.statusBar.overlaysWebView(false);
      this.statusBar.styleLightContent();

      this.initializeOnesignal();

      // for (let i = 0; i < 4; i++) {

      //   await this.testTimeout();
      // }

      // console.log('terminado');


    });

    localStorage.removeItem('pain');
  }

  // testTimeout()
  // {
  //   return new Promise(resolve => {

  //     this.api.testing().subscribe(data=>{
  //       resolve(true);
  //       // console.log('pausa');
  //     })
  //   });
  //   // setTimeout(()=>{
  //   // },1000)
  // }

  initializeOnesignal()
  {
    this.oneSignal.startInit('c6577138-8592-49c5-8c67-6210484e0f4c', '204683025370');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

    this.oneSignal.handleNotificationReceived().subscribe((jsondata) => {
     // do something when notification is received saveOneSignalId
     // console.log('received',jsondata,jsondata.payload.additionalData)
     let data = jsondata.payload.additionalData;
      // this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    });

    this.oneSignal.handleNotificationOpened().subscribe((jsondata) => {
      let data = jsondata.notification.payload.additionalData;
    });

    this.oneSignal.endInit();

    this.oneSignal.getIds().then((ids)=> {
      localStorage.setItem('onesignal_id',ids.userId);

      if (localStorage.getItem('mohedoUser')) {
        let onesignal_id = localStorage.getItem('onesignal_id');

        // this.api.saveOneSignalId({id:this.user.id,onesignal_id:onesignal_id})
        // .subscribe(
        //   data => {console.log('ok');},
        //   err => {console.log(err);}
        // );
      }

    });
  }
}
