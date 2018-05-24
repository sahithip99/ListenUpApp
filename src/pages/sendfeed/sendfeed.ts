import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{AngularFireDatabase} from 'angularfire2/database';
import {UserInfoProvider} from '../../providers/userInfo/userInfo';
import * as firebase from 'firebase';
import {AlertController} from 'ionic-angular';
import {FeedbacktitlePage} from '../../pages/feedbacktitle/feedbacktitle';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';


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
   @ViewChild(Slides) slides: Slides; 
  
  // lockSlide(){
  //       this.slides.lockSwipeToNext() = true;
  // }
  goToSlide(index,type = 2) {
    this.slides.lockSwipeToNext(false)
    this.slides.slideTo(index, 500);
    this.slides.lockSwipeToNext(true);
    this.slides.lockSwipeToPrev(true);
    if(type == 1){
      this.type = 'feedback'
      console.log("chose feedback");
    }
    else if(type == 0){
      this.type = 'review'
      console.log("chose review");
    }
  }
  goBackSlide(index){
     this.slides.lockSwipeToPrev(false);
     this.slides.slideTo(index, 500);
     this.slides.lockSwipeToNext(true);
  }


  //ratings:
  oneStar: any;
  twoStar: any;
  threeStar: any;
  fourStar: any;
  fiveStar: any;
  curRating: any;
	 annon: boolean;
	 usrData: any;
	 param: any; //PARAMETER PASSED FROM THE PREVIOUS PAGE
	 mesData: any = {
	 title: "",
	 message: ""
	 }

   type: any;
   receivePho: any;
   targetFirst: any;
   targetLast: any;
   targetedUser: any;
   slideOptions: any;
   slider: any;
  constructor(public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public afData: AngularFireDatabase, 
  	public uInfo: UserInfoProvider,
  	private alertCtrl: AlertController) {
    this.oneStar = "ios-flash-outline";
    this.twoStar = "ios-flash-outline"
    this.threeStar = "ios-flash-outline"
    this.fourStar = "ios-flash-outline";
    this.fiveStar = "ios-flash-outline";
  	this.param = this.navParams.get('param1');
    console.log("param",this.param);
  	this.usrData = this.uInfo.getUserInfo();
  	this.annon = false;
    this.receivePho = this.param.photourl
    // this.targetedUser = ;
    afData.database.ref('users').child(this.param.id).child('firstname').on("value", datasnap =>{
      this.targetFirst = datasnap.val();
    });
     afData.database.ref('users').child(this.param.id).child('lastname').on("value", datasnap =>{
      this.targetLast = datasnap.val();
    });
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
ionViewDidLoad(){
      this.slides.lockSwipeToNext(true);
      this.slides.lockSwipeToPrev(true);
}

sendMessage(){
  if(this.type == "feedback"){
    this.sendFeedback()
  }
  else if (this.type == "review"){
    this.sendReview();
  }
}

sendReview(){
    var timeStamp =  firebase.database.ServerValue.TIMESTAMP;
   var obj = {
     title: this.mesData.title,
     message: this.mesData.message,
     id: this.usrData.id,
     star: this.curRating,
     firstname: this.usrData.firstname,
     lastname: this.usrData.lastname,
     username: this.usrData.username,
     timeStamp: timeStamp,
    // photourl: this.usrData.photourl
   }
   this.afData.database.ref("users").child(this.param.id).child('review').push(obj).then(success => {
     var key = success.key;
   this.afData.database.ref("users").child(this.param.id).child('review').child(key).update({key: key});
   });
     //photo urlsd
     this.alertControl();
}
 sendFeedback(){
 	var timeStamp =  firebase.database.ServerValue.TIMESTAMP;
 	if(this.annon == false){
 	var obj = {
 		type: "publicfeedbacks",
 		title: this.mesData.title,
 		message: this.mesData.message,
 		id: this.usrData.id,
 		 firstname: this.usrData.firstname,
 		 lastname: this.usrData.lastname,
 		 username: this.usrData.username,
 		timeStamp: timeStamp,
    photourl: this.usrData.photourl
 	}
 	this.afData.database.ref("users").child(this.param.id).child('feedbacks').child("publicfeedbacks").push(obj).then(success => {
 		var key = success.key;
 	this.afData.database.ref("users").child(this.param.id).child('feedbacks').child("publicfeedbacks").child(key).update({key: key});
 	});
 		//photo urlsd
     this.alertControl();
 }
 //---------------SENDING PRIVATE FEEDBACK----------------
 	else if(this.param.allowAnnon && this.annon){
     var obj2 = {
     type: "anonfeedbacks",
     title: this.mesData.title,
     message: this.mesData.message,
     username: "annonymous",
     id: this.param.id,
     firstname: "annonymous",
     timestamp:timeStamp,
     photourl: "https://firebasestorage.googleapis.com/v0/b/eoko-cc928.appspot.com/o/profiles%2Fdefault_avatar.jpg?alt=media&token=761a4187-2508-44fb-994c-9bd0b6842181"
     }
   this.afData.database.ref("users").child(this.param.id).child('feedbacks').child("anonfeedbacks").push(obj2).then(success => {
   var key = success.key;
   this.afData.database.ref("users").child(this.param.id).child('feedbacks').child("anonfeedbacks").child(key).update({key: key});
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



//--------BLOCK USERS----------
blockUser(){
   let alert = this.alertCtrl.create({
     title: 'Block this User?',
     message: 'If the blocked user is not annonymous, you can unblock him later by going to your blacklist in the menu',
     buttons: [
     {
       text: 'No',
       role: 'cancel',
       handler: () =>{
         console.log("cancel clicked");
       }
     },
     {
       text: 'Yes',
       handler: () =>{
         console.log("blocked user");
         var blocked = {};
         var blockedUsers = {};
         blockedUsers[this.param.id] = this.param.username;
         blocked[this.usrData.id] = this.usrData.username;
         this.afData.database.ref('users').child(this.param.id).child('blocked').update({blocked});
         this.afData.database.ref('users').child(this.usrData.id).child("blockedUsers").update(blockedUsers);
         this.navCtrl.pop();
       }
     }
     ]
   });
   // this.uInfo.setUsers();
   alert.present();
  }

goToTitlePage(){
  this.navCtrl.push(FeedbacktitlePage,{param:this.param,
    firstName: this.targetFirst,
    lastName: this.targetLast});
}
 
clickStar(star){
  if(star == "one"){
    this.oneStar = "ios-flash";
    this.twoStar = "ios-flash-outline"
    this.threeStar = "ios-flash-outline"
    this.fourStar = "ios-flash-outline";
    this.fiveStar = "ios-flash-outline";
    this.curRating = 1;
  }
  else if(star == "two"){
     this.oneStar = "ios-flash";
    this.twoStar = "ios-flash";
    this.threeStar = "ios-flash-outline"
    this.fourStar = "ios-flash-outline";
    this.fiveStar = "ios-flash-outline";
    this.curRating = 2;
  }
    else if(star == "three"){
     this.oneStar = "ios-flash";
    this.twoStar = "ios-flash";
    this.threeStar = "ios-flash"
    this.fourStar = "ios-flash-outline";
    this.fiveStar = "ios-flash-outline";
    this.curRating = 3;
  }
     else if(star == "four"){
     this.oneStar = "ios-flash";
    this.twoStar = "ios-flash";
    this.threeStar = "ios-flash"
    this.fourStar = "ios-flash";
    this.fiveStar = "ios-flash-outline";
    this.curRating = 4;
  }
     else if(star == "five"){
     this.oneStar = "ios-flash";
    this.twoStar = "ios-flash";
    this.threeStar = "ios-flash"
    this.fourStar = "ios-flash";
    this.fiveStar = "ios-flash";
    this.curRating = 5;
  }
}
}

