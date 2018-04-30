import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// Providers
import { ChatInfoProvider } from '../../providers/chat-info/chat-info';
import { UserInfoProvider } from '../../providers/userInfo/userInfo';
import { UserInfo } from '@firebase/auth-types';

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

  chatData: Observable<any[]>

  constructor(public navCtrl: NavController
    ,private chatInfo: ChatInfoProvider
    ,private uInfo: UserInfoProvider
    , public navParams: NavParams) {
      //Initialize variables
    this.chatID = this.navParams.get('chatID');
    console.log("chat key", this.chatID);
    this.otherID = this.navParams.get('otherID');

    this.usrID = this.uInfo.getUserInfo().id;

    //Call functions here
    this.loadMessages();
    this.loadOtherInfo();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessageDetailPage');
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

}
