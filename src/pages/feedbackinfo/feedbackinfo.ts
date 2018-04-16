import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import{AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase';
import{UserInfoProvider} from "../../providers/userInfo/userInfo";
/**
 * Generated class for the FeedbackinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feedbackinfo',
  templateUrl: 'feedbackinfo.html',
})
export class FeedbackinfoPage {
  checkboxOpen: boolean;
  reasons: any;
	senderInfo: any;
	senderTitle: any;
	senderMes: any;
  reply: any;
  userinfo: any;
  alertButs = ["Inappropriate messages", "Verbal Harassment", "Verbal Threats"]
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private alertCtrl: AlertController, 
    private afData: AngularFireDatabase,
    private uInfo: UserInfoProvider) {
  	this.senderInfo = this.navParams.get("param");
  	this.senderTitle = this.senderInfo.title;
  	this.senderMes = this.senderInfo.message;
    this.reply = this.navParams.get('reply');
    this.userinfo = this.uInfo.getUserInfo();
  	console.log("sender info",this.senderInfo);
  }
 
 flagUser(){
   let alert = this.alertCtrl.create();
   alert.addInput({
     type: "checkbox",
     label: 'Inappropriate Content',
     value: "Inappropriate Content"
   });

    alert.addInput({
     type: "checkbox",
     label: 'Harassment',
     value: "Harassment"
   });

     alert.addInput({
     type: "checkbox",
     label: 'Threats',
     value: "Threats"
   });

     alert.addInput({
     type: "checkbox",
     label: 'Spam',
     value: "Spam "
   });

     alert.addInput({
       type: "text",
       label: 'Other',
       value: "Other"
     })
   alert.addButton('Cancel');

   alert.addButton({
     text: 'Ok',
     handler: data => {
       console.log("Radio",data);
       this.checkboxOpen = false;
       this.reasons = data;
       var timeStamp =  firebase.database.ServerValue.TIMESTAMP;
       this.afData.database.ref("reports").push({
         timestamp: timeStamp,
         reporterid: this.userinfo.id,
         offenderid: this.senderInfo.id,
         reasons: data 
       });
     }
   });

   alert.present().then(() => {
     this.checkboxOpen = true;
   })
 }

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
         var blockedusers = {};
         blockedusers[this.senderInfo.id] = this.senderInfo.username;
         this.afData.database.ref('users').child(this.userinfo.id).update({blockedusers});
         this.navCtrl.pop();
       }
     }
     ]
   });
   alert.present();
  }
}
