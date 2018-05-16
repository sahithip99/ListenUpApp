import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ChatInfoProvider } from '../../providers/chat-info/chat-info';
import { UserInfoProvider } from '../../providers/userInfo/userInfo';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

//AngularFire
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

//3rd party libraries

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html'
})
export class MessagePage {


  chatArray: any[] = []
  usrId: string;
  usrData: any;
  constArray: any;
  q: any;

  //Observables
  chatList$: Observable<any[]>;

  //Subscriptions
  chatListSubscription: any;


  constructor(
    public navCtrl: NavController
    //private chatInfo: ChatInfoProvider
    ,private uInfo: UserInfoProvider
    ,private afData: AngularFireDatabase
    //,private afAuth: AngularFireAuth
  ) {
    //Initialize variables
    this.usrId = this.uInfo.getUserInfo().id

    //Call functions here
    this.loadDMs();

  }

  loadDMs(){
    this.chatList$ = this.afData.list(`users/${this.usrId}/chats/DMs`).snapshotChanges()
    this.chatListSubscription = this.chatList$.subscribe(chatArr=> {
      this.chatArray = chatArr;
      this.chatArray.forEach(chat=> {
        let otherID = chat.key
        this.uInfo.getOtherUserInfo(otherID).take(1).subscribe(otherInfo=> {
          chat.otherInfo = otherInfo
        })
      })
      console.log("cahts are here",this.chatArray);
      this.constArray = this.chatArray
    })
  }

deleteChat(chat){
  var position = null
  this.afData.database.ref('users').child(this.usrId).child('chats').child('DMs').child(chat.key).remove();
  for(var i in this.chatArray){
    if (this.chatArray[i].key == chat.key){
        position = i;
    }
  }
  this.chatArray.splice(position,1);
}

  goToChatDetail(chatID: string, otherID: string){
    this.navCtrl.push("MessageDetailPage", {chatID: chatID, otherID: otherID})
  }

  searchMessage(searchbar){
    this.chatArray = this.constArray
     this.q = searchbar.srcElement.value;
    console.log('searching...',this.q);
    if (!this.q) {
      return};

    if (String(this.q).replace(/\s/g,"").length ==0){
      return true;
    }
    this.chatArray = this.chatArray.filter((v) => {
      if(v.otherInfo.username && v.otherInfo.email && this.q){
        if (v.otherInfo.username .toLowerCase().indexOf(this.q.toLowerCase()) > -1 ||
          v.otherInfo.email.toLowerCase().indexOf(this.q.toLowerCase()) > -1){
          return true;
        }
        return false;
        }
    });
  }

  ionViewDidLeave() {

  }

}
