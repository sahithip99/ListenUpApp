import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User } from "../../models/user";
import {AngularFireAuth } from "angularfire2/auth";
import{AngularFireDatabase} from 'angularfire2/database';
import {UserInfoProvider} from '../../providers/userInfo/userInfo';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as User;
  usrNames: any;
  usrName: any;
  constructor(private afAuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams, public afData: AngularFireDatabase, public uInfo: UserInfoProvider) {
    this.usrNames = this.uInfo.getUserNames()
    this.usrNames = Object.keys(this.usrNames).map(key => this.usrNames[key]).map(x => x.substr(0,x.length));
    console.log("hi there",this.usrNames);
  }

  async register(user: User){
    
    for(var i = 0; i <this.usrNames.length; i++){
      if (this.usrNames[i] == this.user.username.toUpperCase() || this.usrNames[i] == this.user.username.toLowerCase()){
        console.log('The User Has Already Been Taken!')
        return;
      }
    }
    try{
    const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    var userObj = {
      email: user.email,
      password : user.password,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      id: result.uid,
      login: false
    };
    var nameObj = {};
    nameObj[userObj.id] = userObj.username;
    this.afData.database.ref("users").child(userObj.id).update(userObj).then(success =>{
      console.log("hooray");
    });
    this.afData.database.ref("usernames").update(nameObj).then(success =>{
      console.log("the username is unique");
    });
    console.log(userObj);
      }
    catch(e){
      console.error(e);
    }
  }
}
