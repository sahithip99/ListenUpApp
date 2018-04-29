import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ChatInfoProvider } from '../../providers/chat-info/chat-info';
import { UserInfoProvider } from '../../providers/userInfo/userInfo';
import { Observable } from 'rxjs/Observable';

//AngularFire
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html'
})
export class MessagePage {

  
  chatArray: any[] = []
  usrId: string;

  //Subscriptions
  chatList$: any;
  otherInfo$: any;


  constructor(
    public navCtrl: NavController
    ,private chatInfo: ChatInfoProvider
    ,private uInfo: UserInfoProvider
    ,private afData: AngularFireDatabase
    ,private afAuth: AngularFireAuth
  ) {
    //Initialize variables
    this.usrId = this.uInfo.getUserInfo().id

    //Call functions here
    this.loadDMs();

  }

  loadDMs(){
    this.chatList$ = this.afData.list(`users/${this.usrId}/chats/DMs`).valueChanges().subscribe(chatArr=> {
      this.chatArray = []
      console.log("value changes")
      chatArr.forEach(chat=> {
        console.log("chat", chat)
        //Load information about every single chat the user has
        let chatID = chat["chatID"]
        this.chatInfo.loadChatData(chatID).subscribe(chatObj=> {
          
          //Load the information of users in the chat, only load information of the other user
          if (chatObj["sender"] == this.usrId){
            //You are the sender, load the receiver info
            this.otherInfo$ = this.uInfo.getOtherUserInfo(chatObj["receiver"]).subscribe(receiverInfo => {
              chatObj["otherInfo"] = receiverInfo
              // console.log("receiver Info", receiverInfo)
              this.chatArray.push(chatObj);

            })
          }
          else {
            //You are the receiver, load the sender info
            this.otherInfo$ = this.uInfo.getOtherUserInfo(chatObj["sender"]).subscribe(senderInfo=> {
              chatObj["otherInfo"] = senderInfo
              // console.log("sender Info", senderInfo)
              this.chatArray.push(chatObj);

            })
           
          }
         
          
        
         
        })
      })
      console.log(this.chatArray);
    })

    
    
  }

  goToChatDetail(chatID: string, otherID: string){
    this.navCtrl.push("MessageDetailPage", {chatID: chatID, otherID: otherID})
  }

  ionViewDidLeave() {  
    // alert("Left message page")
    this.chatList$.unsubscribe();
    if (this.otherInfo$){
      this.otherInfo$.unsubscribe();
    }
  }

}
