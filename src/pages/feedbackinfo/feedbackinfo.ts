import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import{ReportuserPage} from '../reportuser/reportuser';

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
	senderInfo: any;
	senderTitle: any;
	senderMes: any;
  reply: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.senderInfo = this.navParams.get("param");
  	this.senderTitle = this.senderInfo.title;
  	this.senderMes = this.senderInfo.message;
    this.reply = this.navParams.get('reply');
  	console.log("sender info",this.senderInfo);
  }
 
 flagUser(){
   this.navCtrl.push(ReportuserPage);
 }
}
