import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {SearchuserPage} from '../searchuser/searchuser';
import {UserInfoProvider} from '../../providers/userInfo/userInfo';

import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html'
})
export class FeedbackPage {
  pubMes: any;
  annonMes: any;
  pubArray: any;
  annonArray: any;
  usrId: any;
  curList = [];
  usrData:any;

  constructor(public navCtrl: NavController, public uInfo: UserInfoProvider, public afData: AngularFireDatabase) {
  	//this.loadFeedInfo();
  	this.usrData = this.uInfo.getUserInfo();
  	this.pubMes = this.usrData.publicfeedbacks;
  	this.annonMes = this.usrData.anonfeedbacks;
  	this.usrId = this.usrData.id;
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
//refresh message
async setUserInfo(){
		await this.afData.database.ref('users/' + this.usrId).once('value',dataSnap =>{
			this.usrData = dataSnap.val();
			console.log("reloading data", this.usrData);

		});
}
 doRefresh(refresher){
 	console.log('Begin async operation',refresher);
 	this.setUserInfo();
 	this.pubMes = this.usrData.publicfeedbacks;
  	this.annonMes = this.usrData.anonfeedbacks;
  	this.setFeedback();
  	 setTimeout(() => {
  	 	console.log('Async operation has ended');
  	 	refresher.complete();
  	 },2000);
 }

}
