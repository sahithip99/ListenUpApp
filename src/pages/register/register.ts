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

  //VARIABLES TO BE USED
  user:any = {
    email: "",
    password : "",
    username: "",
    firstname: "",
    lastname: "",
    username: "",
  }


  //CONSTRUCTOR: all the things that have to be loaded to run the page

  constructor(private afAuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams, public afData: AngularFireDatabase, public uInfo: UserInfoProvider) {
    this.usrNames = this.uInfo.getUserNames()
    this.usrNames = Object.keys(this.usrNames).map(key => this.usrNames[key]).map(x => x.substr(0,x.length));
    console.log("hi there",this.usrNames);
  }


//FUNCTIONS



registerPeople(){
  function checkEmpty(user){
    for(var i in user){
      if(user[i] == '' || user[i] == " " || !(user[i])){
        return false;
      }
    }
    return true;
  }


  if(checkEmpty(this.user)){
    //register the d00d
    this.afAuth.auth.createUserWithEmailAndPassword(this.user.email,this.user.password).then(success => {
    //woooooo were logged in
    this.afData.database.ref('users').child(success.uid).update({
      id: success.uid,
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      email: this.user.email,
      username: this.user.username
    }).then(winning => {
      //donald trump
      console.log("all is done");
      return;
    })
  })
  }
  else{
    console.log("something happend! fix itttttt");
    return;
  }

}
}
