 import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{AngularFireDatabase} from 'angularfire2/database';
import {UserInfoProvider} from '../../providers/userInfo/userInfo';
import * as firebase from 'firebase';
import {AlertController} from 'ionic-angular';
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
   receivePho: any;
  constructor(public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public afData: AngularFireDatabase, 
  	public uInfo: UserInfoProvider,
  	private alertCtrl: AlertController) {
  	this.param = this.navParams.get('param1');
    this.loadReceiverPhoto()
  	this.curUser = this.uInfo.getUserInfo();
  	this.annon = false;
  }



async loadReceiverPhoto(){
      await firebase.storage().ref('profiles').child(this.param.id + '.jpg').getDownloadURL().then(success =>{
      this.receivePho = success;
    },
    fail => {
      this.receivePho = 'https://firebasestorage.googleapis.com/v0/b/eoko-cc928.appspot.com/o/profiles%2Fdefault_avatar.jpg?alt=media&token=761a4187-2508-44fb-994c-9bd0b6842181'
}
    );
  }


alertControl(){
   var alertCtrl = this.alertCtrl.create({
   title: "Feedback Sent!",
   buttons: [
   {
     text: "ok",
     role: "cancel",
     handler: () =>{
       console.log("message sent!");
       this.navCtrl.pop();
     }
   }
   ]
 });
 alertCtrl.present();
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
     this.alertControl();
 }
 //---------------SENDING PRIVATE FEEDBACK----------------
 	else if(this.param.annonallow && this.annon == true){
 		this.afData.database.ref("users").child(this.param.id).child("anonfeedbacks").push({
 		type: "anonfeedbacks",
 		title: this.mesData.title,
 		message: this.mesData.message,
 		username: "annonymous",
 		id: this.param.id,
 		firstname: "annonymous",
 		timestamp:timeStamp
 		//photo url
 	});
     this.alertControl();
 }
 else{
   
    var alertCtrl = this.alertCtrl.create({
   title: "the user does not accept annonymous feedback",
   buttons: [
   {
     text: "ok",
     role: "cancel",
     handler: () =>{
       console.log("the user does not accept annonymous feedback");
       this.navCtrl.pop();
     }
   }
   ]
 });
 alertCtrl.present();
 }
}
}

