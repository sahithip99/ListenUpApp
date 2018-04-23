import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {SearchuserPage} from '../searchuser/searchuser';
import {UserInfoProvider} from '../../providers/userInfo/userInfo';
import {FeedbackinfoPage} from '../feedbackinfo/feedbackinfo';

import { AngularFireDatabase } from 'angularfire2/database';

import {AlertController} from 'ionic-angular';

@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html'
})
export class FeedbackPage {
  pubMes: any; //PUBLIC FEEDBACK
  annonMes: any; //ANNON FEEDBACK
  pubArray: any; //ARRAY THAT STORES PUBLIC FEEDBACK
  annonArray: any;
  usrId: any; //CURRENT USER'S ID
  curList = []; //FOR SWITCHING BETWEEN BETWEEN PUBLIC AND ANNON
  usrData:any; 
  reply: any;
  constructor(public navCtrl: NavController, public uInfo: UserInfoProvider, public afData: AngularFireDatabase, private alertCtrl: AlertController) {
  	this.usrData = this.uInfo.getUserInfo();
  	this.pubMes = this.usrData.publicfeedbacks;
  	this.annonMes = this.usrData.anonfeedbacks;
  	this.usrId = this.usrData.id;
  	this.setFeedback();
    this.reply = true;
    

  }
//---------------REFRESH LIST WHENEVER YOU LOAD THIS PAGE:
 ionViewCanEnter(){
   this.setUserInfo();
   this.pubMes = this.usrData.publicfeedbacks;
   this.annonMes = this.usrData.anonfeedbacks;

 }
//------------INITIALIZE ARRAYS AND SET DEFAULT PAGE AS PUBLIC-------------------
	 setFeedback(){
		this.pubArray = [];
		this.annonArray = [];
	  for(var i in this.pubMes){
		  this.pubArray.push(this.pubMes[i]);
	}
	  for(var i in this.annonMes){
			this.annonArray.push(this.annonMes[i]);
		}
		this.curList = this.pubArray;
	}


//------------WHEN CLICK, GOTO SEARCH USER PAGE-------------
toSendfeed(){
	this.navCtrl.push(SearchuserPage);
}
//------Feedback information indepth-------
toLookfeed(mes){
  this.navCtrl.push(FeedbackinfoPage,
    {param: mes,
     reply : this.reply});
}
//----------CLICKED PUBLIC----------------------
clickPub(){
	this.curList = this.pubArray;
  this.reply = true;
}
//--------------CLICKED ANNON-----------------
clickAnnon(){
	this.curList = this.annonArray
  this.reply = false;
}
//-----------------------REFRESH MESSAGE-----------------------
async setUserInfo(){
		await this.afData.database.ref('users/' + this.usrId).once('value',dataSnap =>{
			this.usrData = dataSnap.val();
			console.log("reloading data", this.usrData);
		});
}

 doRefresh(refresher){
 	console.log('Begin async operation',refresher);
 	this.setUserInfo();
 	this.pubMes = this.usrData.publicfeedbacks;
  	this.annonMes = this.usrData.anonfeedbacks;
  	this.setFeedback();
  	 setTimeout(() => {
  	 	console.log('Async operation has ended');
  	 	refresher.complete();
  	 },2000);
 }

 deleteMes(mes){
   console.log("message:",mes);
   var alertCtrl = this.alertCtrl.create({
     title: "are you sure you want to delete this feedback?",
     message: "this action is permanent",
     buttons: [
     {
       text: "no",
       role: "cancel",
       handler: () =>{
          console.log("cancel clicked");
       }
     },
     {
       text: "yes",
       handler: () => {
        
         this.afData.database.ref('users').child(this.usrId).child(mes.type).child(mes.key).remove();
       }
     }
     ]
   });
   alertCtrl.present();
 }
}
