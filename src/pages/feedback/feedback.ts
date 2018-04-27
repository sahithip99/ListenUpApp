import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {SearchuserPage} from '../searchuser/searchuser';
import {UserInfoProvider} from '../../providers/userInfo/userInfo';
import {ChatInfoProvider} from '../../providers/chat-info/chat-info';
import {FeedbackinfoPage} from '../feedbackinfo/feedbackinfo';

import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

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
  checkboxOpen: any;
  reasons: any;
  constructor(public navCtrl: NavController
    , public uInfo: UserInfoProvider
    , private chatInfo: ChatInfoProvider
    , public afData: AngularFireDatabase
    , private alertCtrl: AlertController) {
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
/*toLookfeed(mes){
  this.navCtrl.push(FeedbackinfoPage,
    {param: mes,
     reply : this.reply});
}
*/
//----------CLICKED PUBLIC----------------------
clickPub(){
	this.curList = this.pubArray;
  console.log("public list clicked!", this.curList);
  this.reply = true;
}
//--------------CLICKED ANNON-----------------
clickAnnon(){
	this.curList = this.annonArray
   console.log("annon list clicked!", this.curList);
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
 flagUser(mes){
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
         reporterid: this.usrData.id,
         offenderid: mes.id,
         reasons: data
       });
     }
   });

   alert.present().then(() => {
     this.checkboxOpen = true;
   })
 }

 blockUser(mes){
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
         blockedusers[mes.id] = mes.username;
         this.afData.database.ref('users').child(this.usrData.id).update({blockedusers});
         if(mes.type == "publicfeedbacks"){
                this.afData.database.ref('users').child(this.usrData.id).child(mes.type).child(mes.key).remove();
         }
         else if(mes.type = "anonfeedbacks"){
             this.afData.database.ref('users').child(mes.id).child(mes.type).child(mes.key).remove();
         }
       }
     }
     ]
   });
   alert.present();
  }


  //Handle dropdowns
  activateDropdown(mes){
    if (mes.dropdown == true){
      mes.dropdown = false;
    }
    else {
      mes.dropdown = true;
    }
  }



  clickMessage(mes){
    console.log(mes);
    var alertCtrl = this.alertCtrl.create({
      title: mes.title,
      message: mes.message,
      buttons: [
      {
        text: 'ok',
        role: 'cancel',
        handler: () =>{
          console.log("reviewed message!");
        }
      },
      {
        text: "report",
        role: "report",
        handler: () =>{
          this.flagUser(mes);
        }
      },
      {
        text: "block",
        role: "block",
        handler: () => {
            this.blockUser(mes);
        }
      }
      ]
    });
    // alertCtrl.present();
  }

  //@param: mes: mes obj, contains info about the feedback
  replyMessage(mes){
    console.log(mes);
    let alert = this.alertCtrl.create({
      title: `Message ${mes.username}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: () => {
            console.log('OK clicked');
            
            this.enterChat(mes)

          }
        }
      ]
    })

    alert.present();

  }

  //NavParams: chatID which is the ID of the chat itself, and otherID which is the ID of the other person
  enterChat(feedback){
    let chatKey = this.chatInfo.checkChat(this.usrId, feedback.id);
    chatKey.then(key=> {
      if (key){
        console.log("Chat is found", key);
        this.navCtrl.push('MessageDetailPage', {chatID: key, otherID: feedback.id})
      }
      else { //Chat has not existed yet
        let createNewChat = this.chatInfo.createNewChat(this.usrId, feedback.id);
        createNewChat.then(newChatKey => {
          this.navCtrl.push('MessageDetailPage', {chatID: newChatKey, otherID: feedback.id});
        })
      }
    })
   
  }


}
