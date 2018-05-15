import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {UserInfoProvider} from "../../providers/userInfo/userInfo";
import { AngularFireDatabase } from 'angularfire2/database';
import {AngularFireAuth } from "angularfire2/auth";
import{LoginPage} from '../login/login';

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
  	this.setNameInfo();
  	this.getTempInfo();
  }

 //----------------------GETTING TEMPORARY VALUE OF THE USER FOR LATER ADDING IT TO THE OBJECT OF ALL THE INFORMATION OF USER---
    getTempInfo(){
   	 this.afData.database.ref("users").child(this.uInfo.getUserId()).once("value", datasnap =>{
   		this.tempInfo = datasnap.val();
   	})
   }
 //----------------------CREATE AN ARRAY OF ALL THE USERNAMES-------------------
   async setNameInfo(){
		await this.afData.database.ref('usernames').once('value',dataSnap =>{
			this.usrNames = dataSnap.val();
			this.usrNames = Object.keys(this.usrNames).map(key => this.usrNames[key]).map(x => x.substr(0,x.length));
		});
	}

finishReg(){
//-----------CHECK UNIQUE USERNAMES------------
 for(var i in this.usrNames){
 	this.uniqueUser = true;
    if(this.user.username == this.usrNames[i]){
      console.log("user name has already being taken");
      this.uniqueUser = false;
      return;
    }
    else{
      console.log("unique user name!");
    }
  }

//----------------CHECK TO SEE IF THE USER ENTERED ANYTHING---------------
 function checkEmpty(user){
    for(var i in user){
    	console.log(user[i]);
      if(user[i] == '' || user[i] == " " || !(user[i])){
        return false;
      }
    }
    return true;
  }
//---------------IF THE ENTERED FIELD IS NOT EMPTY, UPDATE THE USER INFORMATION
var infoObj = {
     id: this.tempInfo.id,
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      email: this.tempInfo.email,
      username: this.user.username,
      allowAnnon: true,
      feedbacks: null,
      photourl: "https://firebasestorage.googleapis.com/v0/b/eoko-cc928.appspot.com/o/profiles%2Fdefault_avatar.jpg?alt=media&token=761a4187-2508-44fb-994c-9bd0b6842181"
}
  if(checkEmpty(this.user) && this.uniqueUser && this.regUser.test(this.user.username)
    && this.regName.test(this.user.firstname)
    && this.regName.test(this.user.lastname)){
    this.afData.database.ref('users').child(this.tempInfo.id).update(infoObj
     ).then(winning => {
      console.log("all is done");
      return;
    })
   //------------ADD THIS USERNAME TO THE LIST OF USERNAMES FOR CHECKING UNIQUE USERNAMES LATER
  var obj ={};
      obj[this.tempInfo.id] = this.user.username;
      this.afData.database.ref('usernames').update(obj);
         this.uInfo.setUserInfoById(this.tempInfo.id);
         this.loadUserInfo();
  }
  else{
    console.log("something happend! fix itttttt");
    return;
  }

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
