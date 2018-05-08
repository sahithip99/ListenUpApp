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
  blockedUsers = [];
  blockedObj =  {};
  annonStatus: any;
  constructor(private afAuth: AngularFireAuth,
    public menuCtrl: MenuController,
              public app: App,
              private afData: AngularFireDatabase,
              private uInfo: UserInfoProvider,
              /*public navCtrl: NavController, 
    public navParams: NavParams */) {
    console.log('Hello HeaderMenuComponent Component');
    this.text = 'Hello World';
    this.loadUserInfo();
    
    //this.blocked();
  }

 loadUserInfo(){
    this.usrInfo = this.uInfo.getUserInfo();
    if (this.usrInfo == undefined){
      setTimeout(() => {
        this.loadUserInfo();
      },1000);
    }
    else{
      console.log("success loading in userinfo");
      this.annonStatus = this.uInfo.getUserInfo().allowAnnon;
    }
  }

blocked(){
  for(var i in this.usrInfo.blockedusers){
    var unique = true;
    for(var j in this.blockedUsers){
      if(this.usrInfo.blockedusers[i] == this.blockedUsers[j]){
        unique = false;
      }
    }
    if(this.usrInfo.blockedusers[i] != "annonymous" && unique ){
      this.blockedObj[i] = this.usrInfo.blockedusers[i];
        this.blockedUsers.push(this.usrInfo.blockedusers[i]);
      }
  }
console.log("blocked users");
this.menuCtrl.close();
var nav = this.app.getRootNav();
nav.push(BlockusersPage,{param1:this.blockedObj,param: this.blockedUsers});
//this.navCtrl.push(BlockusersPage,{param:this.blockedUsers});
}

allowAnnon(){
  if(this.annonStatus){ 
    this.afData.database.ref('users').child(this.uInfo.getUserId()).update({allowAnnon: true});
    //this.annonStatus = false
      console.log("disabled annon");
}
  else{
      this.afData.database.ref('users').child(this.uInfo.getUserId()).update({allowAnnon: false});
      console.log("enabled annon");
        //this.annonStatus = true
  }
}
}
