import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {SearchuserPage} from '../searchuser/searchuser';
import {UserInfoProvider} from '../../providers/userInfo/userInfo';

@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html'
})
export class FeedbackPage {
  pubMes: any;
  annonMes: any;
  constructor(public navCtrl: NavController, public uInfo: UserInfoProvider) {
  	this.annonMes = this.uInfo.getAnnonmes();
  	this.pubMes = this.uInfo.getPubmes();
  	console.log(this.annonMes,this.pubMes);
  }

toSendfeed(){
	this.navCtrl.push(SearchuserPage);
}
}
