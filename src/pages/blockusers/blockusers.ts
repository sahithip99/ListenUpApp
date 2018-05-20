import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{AngularFireDatabase} from 'angularfire2/database';
import {AlertController} from 'ionic-angular';
import {UserInfoProvider} from '../../providers/userInfo/userInfo';
/**
 * Generated class for the BlockusersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-blockusers',
  templateUrl: 'blockusers.html',
})
export class BlockusersPage {
	usrData: any;
  blockedArray: any;
  filterArray: any;
	// blockedObj: any;
  constructor(public navCtrl: NavController, 
  	public navParams: NavParams, 
  	private afData: AngularFireDatabase, 
  	private alertCtrl: AlertController,
  	private uInfo: UserInfoProvider) {
    this.usrData = this.uInfo.getUserInfo();
    this.blockedArray = this.usrData.blockedUsers;
    this.filterArray = [];


    for(var i in this.usrData.blockedUsers){
      if(this.usrData.blockedUsers[i] != "annonymous"){
        var obj = {};
        obj[i] = this.usrData.blockedUsers[i];
        this.filterArray.push(this.usrData.blockedUsers[i]);
      }
    }
    
  }
  ionViewDidLoad() {
    
  }

  searchUsers(searchbar){
  	var q = searchbar.srcElement.value;
  	console.log("searching...",q);
  	if(!q) return;
  	if(String(q).replace(/\s/g,"").length ==0){
  		return true;
  	}
  	this.filterArray = this.filterArray.filter((v) => {
  		if(v && q){
  			if (v.toLowerCase().indexOf(q.toLowerCase()) > -1){
  				return true;
  			}
  			return false;
  		}
  	});
  }

  unblock(user){
  	console.log("user",user);
  	var uid = ""
  	for(var i in this.blockedArray){
  		if(this.blockedArray[i] == user){
  			console.log("i is", i);
  			uid = i;
  			break;
  		}
  	}
  	var alertCtrl = this.alertCtrl.create({
  		title: 'unblock this user?',
  		message: 'he can search you and send feedback to you again',
  		buttons: [
  		{
  			text:'no',
  			role: 'cancel',
  			handler: () =>{
  				console.log("pressed no");
  			}
  		},
  		{
  			text:'yes',
  			handler: () =>{
  				console.log("unblocked user");
  				this.afData.database.ref('users').child(uid).child("blocked").child(this.usrData.id).remove();
          this.afData.database.ref('users').child(this.usrData.id).child("blockedUsers").child(uid).remove();
  				// this.blocked = false;
  				var index = this.filterArray.indexOf(user);
  				this.filterArray.splice(index,1);
  			}
  		}
  		]
  	});
  	alertCtrl.present();
  }
}
