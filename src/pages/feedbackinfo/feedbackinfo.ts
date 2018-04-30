import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import{AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase';
import{UserInfoProvider} from "../../providers/userInfo/userInfo";
/**
 * Generated class for the FeedbackinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feedbackinfo',
  templateUrl: 'feedbackinfo.html',
})
export class FeedbackinfoPage {
  checkboxOpen: boolean;
  reasons: any;
	senderInfo: any;
	senderTitle: any;
	senderMes: any;
  reply: any;
  userinfo: any;
  alertButs = ["Inappropriate messages", "Verbal Harassment", "Verbal Threats"]
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private alertCtrl: AlertController, 
    private afData: AngularFireDatabase,
    private uInfo: UserInfoProvider) {
  	this.senderInfo = this.navParams.get("param");
  	this.senderTitle = this.senderInfo.title;
  	this.senderMes = this.senderInfo.message;
    this.reply = this.navParams.get('reply');
    this.userinfo = this.uInfo.getUserInfo();
  	console.log("sender info",this.senderInfo);
  }
 



 deleteMsg(){
   
 }
}
