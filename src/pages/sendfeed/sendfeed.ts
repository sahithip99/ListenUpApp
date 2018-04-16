import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{AngularFireDatabase} from 'angularfire2/database';
import {UserInfoProvider} from '../../providers/userInfo/userInfo';
import * as firebase from 'firebase';

/**
 * Generated class for the SendfeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-sendfeed',
  templateUrl: 'sendfeed.html',
})
export class SendfeedPage {
	 annon: boolean;
	 curUser: any;
	 param: any; //PARAMETER PASSED FROM THE PREVIOUS PAGE
	 mesData: any = {
	 title: "",
	 message: ""
	 }
  constructor(public navCtrl: NavController, public navParams: NavParams, public afData: AngularFireDatabase, public uInfo: UserInfoProvider) {
  	this.param = this.navParams.get('param1');
  	this.curUser = this.uInfo.getUserInfo();
  	this.annon = false;
  }

//-------------SENDING PUBLIC FEEDBACK--------------------
 sendMessage(){
 	var timeStamp =  firebase.database.ServerValue.TIMESTAMP;
 	if(this.annon == false){
 	var obj = {
 		type: "publicfeedbacks",
 		title: this.mesData.title,
 		message: this.mesData.message,
 		id: this.curUser.id,
 		firstname: this.curUser.firstname,
 		lastname: this.curUser.lastname,
 		username: this.curUser.username,
 		timeStamp: timeStamp
 	}
 	this.afData.database.ref("users").child(this.param.id).child("publicfeedbacks").push(obj).then(success => {
 		var key = success.key;
 	this.afData.database.ref("users").child(this.param.id).child("publicfeedbacks").child(key).update({key: key});
 	});
 		//photo url
 }
 //---------------SENDING PRIVATE FEEDBACK----------------
 	else{
 		this.afData.database.ref("users").child(this.param.id).child("anonfeedbacks").push({
 		type: "anonfeedbacks",
 		title: this.mesData.title,
 		message: this.mesData.message,
 		username: "annonymous",
 		id: this.param.id,
 		firstname: "annonymous",
 		timestamp:timeStamp
 		//photo url
 	})
 }
}

}