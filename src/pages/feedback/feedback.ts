import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {SearchuserPage} from '../searchuser/searchuser';

@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html'
})
export class FeedbackPage {

  constructor(public navCtrl: NavController) {

  }

toSendfeed(){
	this.navCtrl.push(SearchuserPage);
}
}
