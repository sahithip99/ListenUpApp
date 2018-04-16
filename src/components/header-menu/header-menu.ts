import { Component } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {LoginPage} from '../../pages/login/login';
import { App,MenuController } from 'ionic-angular';
import{AngularFireDatabase} from 'angularfire2/database';
//import { IonicPage, NavController, NavParams } from 'ionic-angular';

import{UserInfoProvider} from '../../providers/userInfo/userInfo';
import{BlockusersPage} from "../../pages/blockusers/blockusers";
/**
 * Generated class for the HeaderMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'header-menu',
  templateUrl: 'header-menu.html'
})
export class HeaderMenuComponent {

  text: string;
  usrInfo: any;
  blockedUsers = []
  constructor(private afAuth: AngularFireAuth,
    public menuCtrl: MenuController,
              public app: App,
              private afData: AngularFireDatabase,
              private uInfo: UserInfoProvider,
              //public navCtrl: NavController, 
    /*public navParams: NavParams */) {
    console.log('Hello HeaderMenuComponent Component');
    this.text = 'Hello World';
    this.usrInfo = uInfo.getUserInfo();
  }

logoutClicked(){
	console.log('Logout...')
	this.afAuth.auth.signOut();
	this.menuCtrl.close();
	var nav = this.app.getRootNav();
	nav.setRoot(LoginPage);
}

blocked(){
  for(var i in this.usrInfo.blockedusers){
    if(this.usrInfo.blockedusers[i] != "annonymous"){
        this.blockedUsers.push(this.usrInfo.blockedusers[i]);
  }
}  
//this.navCtrl.push(BlockusersPage,{param:this.blockedUsers});
}
}
