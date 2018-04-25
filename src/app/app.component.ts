import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import {LoginPage} from '../pages/login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import {UserInfoProvider} from '../providers/userInfo/userInfo';
import {RegisterPage} from '../pages/register/register';
import {CreateuserPage} from '../pages/createuser/createuser';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  usrInfo: any;
  constructor(platform: Platform, statusBar: StatusBar,
    splashScreen: SplashScreen, private afAuth: AngularFireAuth, private uInfo:UserInfoProvider) {

    platform.ready().then(() => {
       this.afAuth.auth.onAuthStateChanged(user => {
         if(user != undefined){
         this.uInfo.setUserInfo(user).then(success =>{
           this.loadUserInfo(user);
         });
       }
      });
      statusBar.styleDefault();
      splashScreen.hide();

    });
  }
loadUserInfo(user){
    this.usrInfo = this.uInfo.getUserInfo();
    this.uInfo.setUsers();
    this.uInfo.setPhoto(user.id);
    if (this.usrInfo == undefined || this.usrInfo == null || this.uInfo.getPhoto() == undefined || this.uInfo.getPhoto() == null){
      setTimeout(() => {
        this.loadUserInfo(user);
      },1000);
    }
    else{
       if(user){
          //user logged in
          if(this.usrInfo.username){
              this.rootPage = TabsPage;
          }
          else{
            this.rootPage = CreateuserPage;
          }
        }
        else{
        //user logged out
          this.rootPage = LoginPage;
        };
    }
  }

}
