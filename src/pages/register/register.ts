import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User } from "../../models/user";
import {AngularFireAuth } from "angularfire2/auth";
import{AngularFireDatabase} from 'angularfire2/database';

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
  errorMessage = ""

  constructor(private afAuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams, public afData: AngularFireDatabase) {
  }



  async register(user: User){
    if(user.username == null){
         this.errorMessage = "Please provide a valid username"
         return
    }
    if(user.firstname == null){
         this.errorMessage = "Please provide a valid firstname"
         return
    }
    if(user.lastname == null){
         this.errorMessage = "Please provide a valid last name"
         return
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
    this.afData.database.ref("users").child(userObj.id).update(userObj).then(success =>{
      console.log("hooray");
      console.log(userObj);

    })
      }
    catch(e){
      console.error(e);
      if(e.code == "auth/argument-error"){
           this.errorMessage = "Please fill in required boxes"
         }
      if(e.code == "auth/invalid-email"){
           this.errorMessage = "Please provide valid email"
      }
      if(e.code == "auth/weak-password"){
           this.errorMessage = "Password too weak. Passwords must be six characters long or more"
      }
      if(e.code == "auth/email-already-in-use"){
           this.errorMessage = "Email already in use. Please use a different email"
      }



    }
  }
}
