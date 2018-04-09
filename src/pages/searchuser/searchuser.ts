import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserInfoProvider} from '../../providers/userInfo/userInfo';

import{SendfeedPage} from '../sendfeed/sendfeed';

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

	userList: any;
	curUser: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public uInfo: UserInfoProvider) {
  	    this.userList = this.uInfo.usersArray();
  	    console.log(this.userList);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchuserPage');
  }


  searchUsers(searchbar){
  	this.userList = this.uInfo.usersArray();
  	var q = searchbar.srcElement.value;
  	console.log('searching...',q);
  	if (!q) return;

  	if (String(q).replace(/\s/g,"").length ==0){
  		return true;
  	}
  	this.userList = this.userList.filter((v) => {
  		if(v.username && v.email && q){
  			if (v.username.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
  				v.email.toLowerCase().indexOf(q.toLowerCase()) > -1){
  				return true;
  			}
  			return false;
  			}
  		
  	});
  }

  goToSend(user){
  	this.navCtrl.push(SendfeedPage,{
  		param1: user
  	});
  	this.curUser = user;
}

	returnUser(){
	this.curUser;
}
}
	