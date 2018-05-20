import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {UserInfoProvider} from "../../providers/userInfo/userInfo";
import { AngularFireDatabase } from 'angularfire2/database';
import {AngularFireAuth } from "angularfire2/auth";
import{LoginPage} from '../login/login';
import * as firebase from 'firebase';
@IonicPage()
@Component({
  selector: 'page-createuser',
  templateUrl: 'createuser.html',
})
export class CreateuserPage {
	usrNames: any;
	uniqueUser: any;
	rootPage: any = CreateuserPage;
	usrInfo: any;
  paramInfo: any;
	tempInfo: any;
	user: any = {
		username: "",
		firstname: "",
		lastname: ""
	}
  regUser: RegExp = /^[a-z0-9]+$/i
  regName: RegExp = /^[a-z]+$/i
  constructor(public navCtrl: NavController,
   public navParams: NavParams, 
   public uInfo: UserInfoProvider, 
   public afData: AngularFireDatabase, 
   public afAuth: AngularFireAuth,
  )  {
  	// this.setNameInfo();
  	this.getTempInfo();
    this.uniqueUser = false;
  }

 //----------------------GETTING TEMPORARY VALUE OF THE USER FOR LATER ADDING IT TO THE OBJECT OF ALL THE INFORMATION OF USER---
    getTempInfo(){
   	 this.afData.database.ref("users").child(this.uInfo.getUserId()).once("value", datasnap =>{
   		this.tempInfo = datasnap.val();
   	})
   }

 finishReg(){
    var ref = firebase.database().ref("usernames");
 ref.orderByChild("username").equalTo(this.user.username).once("value", snapshot => {
 if(snapshot.val()){
   this.uniqueUser = false;
   console.log("not unique username");
 }
 else{
   this.uniqueUser = true;
   console.log("Unique username");
   var infoObj = {
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      username: this.user.username,
      allowAnnon: true,
      blocked: {'user': "id"},
      photourl: "https://firebasestorage.googleapis.com/v0/b/eoko-cc928.appspot.com/o/profiles%2Fdefault_avatar.jpg?alt=media&token=761a4187-2508-44fb-994c-9bd0b6842181"
}
  if(this.checkEmpty(this.user) && this.uniqueUser && this.regUser.test(this.user.username)
    && this.regName.test(this.user.firstname)
    && this.regName.test(this.user.lastname)){
    this.afData.database.ref('users').child(this.tempInfo.id).update(infoObj
     ).then(winning => {
      console.log("all is done");
      return;
    })
   //------------ADD THIS USERNAME TO THE LIST OF USERNAMES FOR CHECKING UNIQUE USERNAMES LATER
  var obj ={};
      obj["username"] = this.user.username;
      this.afData.database.ref('usernames').child(this.tempInfo.id).update(obj);
         this.uInfo.setUserInfoById(this.tempInfo.id);
         this.loadUserInfo();
  }
  else{
    console.log("something happend! fix itttttt");
    return;
  }''
 }
});

}

checkEmpty(user){

    for(var i in user){
      console.log(user[i]);
      if(user[i] == '' || user[i] == " " || !(user[i])){
        return false;
      }
    }
    return true;
  }

  loadUserInfo(){
    this.usrInfo = this.uInfo.getUserInfo();
    var length =  Object.keys(this.usrInfo).length;
    console.log("length",length);
     if(length == 2){
       setTimeout(() => {
        this.loadUserInfo();
      },1000);
    }
    else{
        this.navCtrl.setRoot(TabsPage);
    }
  }
}
