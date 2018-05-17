import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserInfoProvider} from '../../providers/userInfo/userInfo';
//import * as firebase from 'firebase';
// import{SendfeedPage} from '../sendfeed/sendfeed';

/**
 * Generated class for the SearchuserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-searchuser',
  templateUrl: 'searchuser.html',

})
export class SearchuserPage {
  i = 0
	userList: any;
	curUser: any;
  q: any;
  userPhoto: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public uInfo: UserInfoProvider) {
        var usrId = this.uInfo.getUserInfo().id;
  	    // this.userList = this.uInfo.usersArray();
        for(var i in this.userList){
          if (this.userList[i].id == usrId){
            this.userList.splice(i,1);
          }
        }
        for(var i in this.userList){
          for(var j in this.userList[i].blockedusers){
              if(j == usrId){
                this.userList.splice(i,1)
              }
          }
        }
        this.userList = [];
        console.log("array of users",this.userList);
  }


  //------------SEARCHING USERS--------------------
  searchUsers(searchbar){
  	// this.userList = this.uInfo.usersArray();
  	 this.q = searchbar.srcElement.value;
  	console.log('searching...',this.q);
  	if (!this.q) {
      this.userList = [];
      return};

  	if (String(this.q).replace(/\s/g,"").length ==0){
      this.userList = [];
  		return true;
  	}
  	this.userList = this.userList.filter((v) => {
  		if(v.username && v.email && this.q){
  			if (v.username.toLowerCase().indexOf(this.q.toLowerCase()) > -1 ||
  				v.email.toLowerCase().indexOf(this.q.toLowerCase()) > -1){
  				return true;
  			}
  			return false;
  			}

  	});
  }
//-------------GO TO SENDFEED PAGE---------------
  goToSend(user){
  	this.navCtrl.push("SendfeedPage",{
  		param1: user
  	});
  	this.curUser = user;
}

}
