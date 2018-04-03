import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User } from "../../models/user";
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';

import {UserInfoProvider} from '../../providers/userInfo/userInfo';
import {TabsPage} from '../tabs/tabs';
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

  user = {} as User;
  constructor(private afAuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams, public uInfo: UserInfoProvider) {
    this.usrInfo = this.uInfo.getUserInfo();
  }  
  async login(user: User) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if (result) {
        console.log(result);
        this.navCtrl.setRoot(TabsPage);
      }
    }
  catch(e){
    console.error(e);
    }
  }

  register(){
    this.navCtrl.push('RegisterPage');

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
