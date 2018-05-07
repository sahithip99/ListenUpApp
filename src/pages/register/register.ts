import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireAuth } from "angularfire2/auth";
import{AngularFireDatabase} from 'angularfire2/database';
import {UserInfoProvider} from '../../providers/userInfo/userInfo';
import {CreateuserPage} from '../createuser/createuser';
import {ModalController} from 'ionic-angular';
import {TermsOfServicesPage} from '../terms-of-services/terms-of-services';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
usrNames: any;
uniqueUser: any;
infoVar: any;
usrInfo: any;
  //VARIABLES TO BE USED
  user:any = {
    email: "",
    password : "",
    repass: "",
    cEmail: ""
  }


  //CONSTRUCTOR: all the things that have to be loaded to run the page

  constructor(private afAuth: AngularFireAuth,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public afData: AngularFireDatabase, 
    public uInfo: UserInfoProvider,
    public mdCtrl: ModalController,) {
  }

registerPeople(){
  if(this.user.password == this.user.repass && this.user.cEmail == this.user.email){
       this.afAuth.auth.createUserWithEmailAndPassword(this.user.email,this.user.password).then(success => {
       this.infoVar = {
       id: success.uid,
       email: this.user.email,
       }
       this.afData.database.ref('users').child(this.infoVar.id).update(this.infoVar);
       this.navCtrl.setRoot(CreateuserPage);
    }).then(winning => {
       console.log("all is done");
       return;
    });
  }
  else{
       console.log("something happend! fix itttttt");
       return;
  }
}
presentTerms(){
  let termModal = this.mdCtrl.create(TermsOfServicesPage)
   termModal.present();
}

}
