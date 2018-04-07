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

  //VARIABLES TO BE USED
  user:any = {
    email: "",
    password : "",
    username: "",
    firstname: "",
    lastname: "",
  }


  //CONSTRUCTOR: all the things that have to be loaded to run the page
  constructor(private afAuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams, public afData: AngularFireDatabase) {
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
      email: this.user.email
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
  /*async register(user: User){ //async: all at once, 2+ simultaneously
    try{
    const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password); //because of async, has to be done
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
      for (var i in userObj){
        if (userObj[i]=''){
          console.log(i + "field has not been filled out.");
          console.error(e);
        }
        else {console.log("hooray");}
      }

    })
    console.log(userObj);
      }
    catch(e){
      console.error(e);
    }
  }*/
}
