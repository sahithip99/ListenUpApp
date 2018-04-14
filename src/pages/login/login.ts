import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User } from "../../models/user";
import {AngularFireAuth} from 'angularfire2/auth';
import { Platform } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import {UserInfoProvider} from '../../providers/userInfo/userInfo';
import {CreateuserPage} from '../createuser/createuser';
//import * as firebase from 'firebase';

import {RegisterPage} from '../register/register';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  usrInfo: any;
  allUsers: any;
  log = false;
  reg = false;
  rootPage: any = LoginPage;
  user = {} as User;
  constructor(private afAuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams, public platform : Platform, public uInfo: UserInfoProvider) {
     

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need
    //this.usrInfo = this.uInfo.getUserInfo();
   // this.allUsers = this.uInfo.allUsers();
   // this.loadUserInfo();
  }

  async login(user: User) {
    this.log = true;
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if (result) {
        console.log('result',result);
        this.loadUserInfo();
       this.navCtrl.setRoot(TabsPage);
      }
    }
  catch(e){
    console.error(e);
    }
  }

  loadUserInfo(){
    this.usrInfo = this.uInfo.getUserInfo();
    if (this.usrInfo == undefined || this.usrInfo == null){
      setTimeout(() => {

        this.loadUserInfo();
      },1000);
    }
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

}
