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
	blockedUsers: any;
	blockedObj: any;
	blocked = true;
  constructor(public navCtrl: NavController, 
  	public navParams: NavParams, 
  	private afData: AngularFireDatabase, 
  	private alertCtrl: AlertController,
  	private uInfo: UserInfoProvider) {
  	this.blockedUsers = this.navParams.get("param");
  	this.blockedObj = this.navParams.get("param1");
  	console.log("blocked guy",this.blockedUsers);
  	console.log("blocked obj",this.blockedObj);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BlockusersPage');
  }

  searchUsers(searchbar){
  	var q = searchbar.srcElement.value;
  	console.log("searching...",q);
  	if(!q) return;
  	if(String(q).replace(/\s/g,"").length ==0){
  		return true;
  	}
  	this.blockedUsers = this.blockedUsers.filter((v) => {
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
  	for(var i in this.blockedObj){
  		if(this.blockedObj[i] == user){
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
  				this.afData.database.ref('users').child(this.uInfo.getUserInfo().id).child("blockedusers").child(uid).remove();
  				this.blocked = false;
  				var index = this.blockedUsers.indexOf(user);
  				this.blockedUsers.split(index,1);
  			}
  		}
  		]
  	});
  	alertCtrl.present();
  }
}
