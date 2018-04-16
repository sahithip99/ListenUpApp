import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.blockedUsers = this.navParams.get("param");
  	console.log("blocked guy",this.blockedUsers);
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
  		if(v.username && q){
  			if (v.username.toLowerCase().indexOf(q.toLowerCase()) > -1){
  				return true;
  			}
  			return false;
  		}
  	});
  }
}
