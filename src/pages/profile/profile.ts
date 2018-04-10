import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {UserInfoProvider} from '../../providers/userInfo/userInfo';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  firstName: any;
  lastName: any;
  userName: any;
  usrInfo: any;
  constructor(public navCtrl: NavController, public uInfo: UserInfoProvider) {
    this.loadUserInfo();
  }


//----------------WHEN LOADING AND USER INFORMATION IS UNDEFINED, RELAOD AGAIN AFTER 1 SECOND---------------
  loadUserInfo(){
    this.usrInfo = this.uInfo.getUserInfo();
    if (this.usrInfo == undefined || this.usrInfo == null){
      setTimeout(() => {
        console.log("try again");
        this.loadUserInfo();
      },1000);
    }
    else{
      console.log("hit there",this.usrInfo)
      this.firstName = this.usrInfo.firstname;
      this.lastName = this.usrInfo.lastname;
      this.userName = this.usrInfo.username;
    }
  }
}
