import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// Providers
import { ChatInfoProvider } from '../../providers/chat-info/chat-info';
import { UserInfoProvider } from '../../providers/userInfo/userInfo';
//import { UserInfo } from '@firebase/auth-types';

import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

import { ActionSheetController } from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the MessageDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message-detail',
  templateUrl: 'message-detail.html',
})
export class MessageDetailPage {

  chatID: string;
  usrID: string;
  otherID: string;
  otherData: any;
  messageText: string;
  checkboxOpen: any;
  reasons: any;
  otherInfo: any;
  chatData: Observable<any[]>

  constructor(public navCtrl: NavController
    ,private chatInfo: ChatInfoProvider
    ,private uInfo: UserInfoProvider
    , public navParams: NavParams,
    public alertCtrl: AlertController,
    private afData: AngularFireDatabase,
    public sheetCtrl : ActionSheetController) {
      //Initialize variables
    this.chatID = this.navParams.get('chatID');
    console.log("chat key", this.chatID);
    this.otherID = this.navParams.get('otherID');
    console.log("what is other id",this.otherID);
    this.usrID = this.uInfo.getUserInfo().id;
    //Call functions here
    this.getOtherInfo()
    this.loadMessages();
    this.loadOtherInfo();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessageDetailPage');
  }

  getOtherInfo(){
    this.afData.database.ref('users').child(this.otherID).once('value',dataSnap =>{
      this.otherInfo = dataSnap.val();
      // if(!this.otherInfo){
      //   setTimeout(() =>{
      //     this.otherInfo = dataSnap.val
      //   })
      // }
      console.log("other info",this.otherInfo);
    })
  }

  loadMessages(){
    this.chatData = this.chatInfo.loadMessages(this.chatID);

  }

  loadOtherInfo(){
    this.uInfo.getOtherUserInfo(this.otherID).subscribe(otherPersonData=> {
      this.otherData = otherPersonData;
      console.log(this.otherData);
    })
  }

  sendMessage(text){
    this.chatInfo.addMessage(text, this.usrID, this.otherID, this.chatID);
    this.messageText = ""
  }

  logChat(chat){
    console.log(chat.sender)
    // console.log(this.usrId)
  }
 reportUser(){
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
         reporterid: this.usrID,
         offenderid: this.otherID,
         reasons: data
       });
      this.navCtrl.pop()
     }
   });
   alert.present().then(() => {
     this.checkboxOpen = true;
   });
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
         blockedusers[this.otherID] = this.otherInfo.username;
         this.afData.database.ref('users').child(this.usrID).update({blockedusers});
         this.navCtrl.pop()
       }
     }
     ]
   });
   alert.present();
  }

 flagUser(){
   let actionSheet = this.sheetCtrl.create({
     title: 'Report or block this user?',
     buttons: [
     {
       text: 'Report',
       role: 'report',
       handler: () =>{
         this.reportUser();
       }
     },
     {
       text: 'Block',
       role: 'block',
       handler: () =>{
         this.blockUser();
       }
     },
     {
       text: 'Cancel',
       role: 'cancel',
       handler: () => {
         console.log("canceled clicked");
       }
     }
     ]
   });
   actionSheet.present();
}

}
