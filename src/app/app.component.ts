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
     this.loadUserInfo();
    platform.ready().then(() => {
       this.afAuth.auth.onAuthStateChanged(user => {
         if(user){
           this.uInfo.setUserInfo(user)
           this.loadUserInfo();
         }
         else{
            this.rootPage = LoginPage;
         }
         // if(user != null){
         //.then(success =>{

           console.log("auth state",user);
         //});
       // }
      });
      statusBar.styleDefault();
      splashScreen.hide();

    });
  }
loadUserInfo(){
    this.usrInfo = this.uInfo.getUserInfo();
    // this.uInfo.setUsers();
    if(this.usrInfo){
           this.uInfo.setPhoto(this.usrInfo.id);
    }

    // if (user == null){
    //     //user logged out
    //       this.rootPage = LoginPage;
    //  }
     if (this.usrInfo == undefined || this.uInfo.getPhoto() == undefined ){
      setTimeout(() => {
        this.loadUserInfo();
      },1000);
    }
    // else{
       // if(user){
          //user logged in
        else{
          if(this.usrInfo.username){
              this.rootPage = TabsPage;
          }
                    else {
            this.rootPage = CreateuserPage;
          }
        }
          // }
   
  // }

}
}