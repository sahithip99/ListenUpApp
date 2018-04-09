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
  pubArray: any;
  annonArray: any;
  curList = [];

  constructor(public navCtrl: NavController, public uInfo: UserInfoProvider) {
  	//this.loadFeedInfo();
  	this.pubMes = this.uInfo.getUserInfo().publicfeedbacks;
  	this.annonMes = this.uInfo.getUserInfo().anonfeedbacks;
  	this.setFeedback();

  }

	 setFeedback(){
		this.pubArray = [];
		this.annonArray = [];
	for(var i in this.pubMes){
		this.pubArray.push(this.pubMes[i]);
	}
	for(var i in this.annonMes){
			this.annonArray.push(this.annonMes[i]);
		}
		console.log("pub",this.pubArray);
		console.log("annon",this.annonArray);
		this.curList = this.pubArray;
	}
/*loadFeedInfo(){
   	this.pubMes = this.uInfo.getPubmes();
   	this.annonMes = this.uInfo.getAnnonmes();
    if (this.pubMes == null || this.annonMes == null){
      setTimeout(() => {
        console.log("try again");
        this.loadFeedInfo();
      },1000);
    }
    else{
      console.log("got feed",this.pubMes,this.annonMes)
    }
  }
*/
toSendfeed(){
	this.navCtrl.push(SearchuserPage);
}

clickPub(){
	this.curList = this.pubArray;
}
clickAnnon(){
	this.curList = this.annonArray
}
}
