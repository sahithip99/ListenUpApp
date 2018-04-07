import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import {LoginPage} from '../pages/login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import {UserInfoProvider} from '../providers/userInfo/userInfo';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  constructor(platform: Platform, statusBar: StatusBar, 
    splashScreen: SplashScreen, private afAuth: AngularFireAuth, private uInfo:UserInfoProvider) {
    platform.ready().then(() => {
      this.afAuth.auth.onAuthStateChanged(user => {
        if(user){
          console.log("logged in");
          this.uInfo.setUserInfo(user);
          this.rootPage = TabsPage;
        }
        else{
          console.log("logged out");
        }
      })

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
