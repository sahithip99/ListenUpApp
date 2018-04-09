// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { UserInfoProvider } from '../userInfo/userInfo';

@Injectable()
export class ChatInfoProvider {

  constructor(
    // public http: HttpClient
    private afData: AngularFireDatabase
    ,private uInfo: UserInfoProvider

  ) {
    console.log('Hello ChatInfoProvider Provider');

  }

  //--------------------------------MESSAGE TAB ---------------------------------------------
/**
 * [createNewChat initializes the chat object for that feedback ]
 * @param  {[string]} uid1       [first id]
 * @param  {[string]} uid2       [second id]
 * @param  {[string]} feedbackID [id of the feedback that is related to the chat]
 * @return {[type]}            [nothing]
 */
  createNewChat(uid1: string, uid2: string, feedbackID: string) {

    //Initialize chat object
    let chatRef = this.afData.database.ref(`chats/${feedbackID}`);
    let ids = {}

    ids[uid1] = {
      id: uid1
    }
    ids[uid2] = {
      id: uid2
    }
    let chatObj = {
      feedbackID: feedbackID,
      ids: ids
    }

    chatRef.update(chatObj);


  }

  enterChat(chatID: string) {

  }

/**
 * [loadMessages loads the messages in an async list]
 * @param  {[string]} chatID [description]
 * @return {[Observable]}   messages$     [an Observable list of messages that is async]
 */
  loadMessages(chatID: string) {
    let messages$: Observable<any[]>;
    messages$ = this.afData.list(`messages/${chatID}/`).valueChanges();
    return messages$;
  }

  // tester() {
  //   this.createNewChat("uid1","uid2", "randomFeedbackID");
  //   this.loadMessages("randomFeedbackID").subscribe(messageArr=> {
  //     console.log("messageArr", messageArr)
  //   })
  // }


  //-------------------------------------CHAT TAB ---------------------------------------------------
  addMessage(text: string, senderUID: string, receiverUID: string, chatID: string){
    let chatRef = this.afData.database.ref(`messages/${chatID}/messages`);
    let timestamp = Date.now();
    let messageObj = {
      text: text,
      timestamp: timestamp,
      sender: senderUID,
      receiver: receiverUID
    };
    //Push message up to firebase Database
    let key = chatRef.push().key;
    chatRef.child(key).update(messageObj);
  }



}
