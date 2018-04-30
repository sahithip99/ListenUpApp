// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { UserInfoProvider } from '../userInfo/userInfo';

import * as firebase from 'firebase';

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
  async createNewChat(uid1: string, uid2: string) {

    // Initialize chat object
    let ref = this.afData.database.ref(`chats`);
    let key = ref.push().key
    let chatRef = ref.child(key)
    

    // Initialize uids
    let uids = {}

    uids[uid1] = {
      id: uid1
    }
    uids[uid2] = {
      id: uid2
    }
    let chatObj = {
      uids: uids,
      key: key
    }

    await chatRef.update(chatObj);

    
    let userRef1 = this.afData.database.ref(`users/${uid1}/chats/DMs/${uid2}`)
    let userRef2 = this.afData.database.ref(`users/${uid2}/chats/DMs/${uid1}`)
    await userRef1.update({chatID: key})
    await userRef2.update({chatID: key})
    return key
  }

  // Check if chat already exists, if yes returns the chat key, if no returns false
  // Returns a promise
  async checkChat(uid1, uid2){
    let chatRef = firebase.database().ref(`users/${uid1}/chats/DMs/${uid2}`)
    let chatData = await chatRef.once("value")

    //Check if chat has already existed
    if (chatData.exists()){
      return chatData.val().chatID
    }
    else {
      return false;
    }

  }

  

  

  enterChat(chatID: string) {
    let chatData = this.afData.list(`chats/${chatID}`).valueChanges()
    return chatData;
  }

  /**
   * loadChatData is different that loadMessages in that it loads data about the chat, while loadMessages load the messages from that chat
   * @param chatID 
   * return data about the chat itself e.g. last text, timestamp, people in the chat
   */
  loadChatData(chatID: string){
    let chatData$: Observable<{}>
    chatData$ = this.afData.object(`chats/${chatID}`).valueChanges();
    return chatData$
  }

/**
 * [loadMessages loads the messages in an async list]
 * @param  {[string]} chatID [description]
 * @return {[Observable]}   messages$     [an Observable list of messages that is async]
 */
  loadMessages(chatID: string) {
    let messages$: Observable<any[]>;
    messages$ = this.afData.list(`messages/${chatID}/messages`).valueChanges();
    return messages$;
  }

 


  //-------------------------------------CHAT TAB ---------------------------------------------------
  async addMessage(text: string, userID: string, otherID: string, chatID: string){
    let messageRef = this.afData.database.ref(`messages/${chatID}/messages`);
    //Push message up to firebase Database
    let key = messageRef.push().key;
    let timestamp = firebase.database.ServerValue.TIMESTAMP;
    let messageObj = {
      text: text,
      timestamp: timestamp,
      sender: userID,
      receiver: otherID,
      key: key
    };
    messageRef.child(key).update(messageObj);
 
    //Updated chat obj
    let chatRef = this.afData.database.ref(`chats/${chatID}`)
    let userRef = this.afData.database.ref(`users/${userID}/chats/DMs/${otherID}`)
    let otherUserRef = this.afData.database.ref(`users/${otherID}/chats/DMs/${userID}`)
    console.log(userRef)
    let obj = {
      lastText: text,
      timestamp: timestamp,
      sender: userID,
      receiver: otherID
    }
    chatRef.update(obj)
    userRef.update(obj)
    otherUserRef.update(obj);

    
    
  }



}
