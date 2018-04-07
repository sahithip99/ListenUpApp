import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User } from "../../models/user";
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';

import {UserInfoProvider} from '../../providers/userInfo/userInfo';
import {TabsPage} from '../tabs/tabs';
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

  user = {} as User;
  constructor(private afAuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams, public uInfo: UserInfoProvider, public afData: AngularFireDatabase) {
    this.usrInfo = this.uInfo.getUserInfo();
    this.allUsers = this.uInfo.allUsers();
    this.loadUserInfo();
  } 

  async login(user: User) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if (result) {
        console.log(result);
        this.navCtrl.setRoot(TabsPage);
        console.log('user info',this.usrInfo)
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
        console.log("try again");
        this.loadUserInfo();
      },1000);
    }
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
