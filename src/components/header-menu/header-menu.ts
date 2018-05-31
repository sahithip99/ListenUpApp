import { Component } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {LoginPage} from '../../pages/login/login';
import { App,MenuController, MenuClose } from 'ionic-angular';
import{AngularFireDatabase} from 'angularfire2/database';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import{UserInfoProvider} from '../../providers/userInfo/userInfo';
import{BlockusersPage} from "../../pages/blockusers/blockusers";
// import{SettingsPage} from "../../pages/settings/settings";
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
              public alertCtrl: AlertController,
              // public navCtrl: NavController,
    // public navParams: NavParams,
  ) {
    console.log('Hello HeaderMenuComponent Component');
    this.text = 'Hello World';
    this.loadUserInfo();

    //this.blocked();
  }

 loadUserInfo(){
    this.usrInfo = this.uInfo.getUserInfo();
    if (this.usrInfo == undefined){
      console.log("try again on header menu page");
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
//   for(var i in this.usrInfo.blocked){
//     var unique = true;
//     for(var j in this.blockedUsers){
//       if(this.usrInfo.blockedusers[i] == this.blockedUsers[j]){
//         unique = false;
//       }
//     }
//     if(this.usrInfo.blockedusers[i] != "annonymous" && unique ){
//       this.blockedObj[i] = this.usrInfo.blockedusers[i];
//         this.blockedUsers.push(this.usrInfo.blockedusers[i]);
//       }
//   }
// console.log("blocked users");
this.menuCtrl.close();
var nav = this.app.getRootNav();
nav.push(BlockusersPage/*,{param1:this.blockedObj,param: this.blockedUsers}*/);
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


logoutClicked(){
  var alertCtrl = this.alertCtrl.create({
    title: 'Are you sure you want to log out?',
    buttons:[{
      text: "Logout",
      role: "Logout",
      handler: () => {
          console.log('Logout...')
          this.afAuth.auth.signOut();
          this.uInfo.clearUserInfo();
          var nav = this.app.getRootNav();
          nav.setRoot(LoginPage);
      }
    },
    {
      text: "Cancel",
      role: "cancel"
    }
    ]});
  alertCtrl.present();
}

pushSettings(){
  var nav = this.app.getRootNav();
  this.menuCtrl.close();
  nav.setRoot("SettingsPage");
}
}
