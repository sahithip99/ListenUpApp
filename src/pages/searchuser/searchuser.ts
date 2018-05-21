import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserInfoProvider} from '../../providers/userInfo/userInfo';
import * as firebase from 'firebase';
// import{SendfeedPage} from '../sendfeed/sendfeed';

/**
 * Generated class for the SearchuserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-searchuser',
  templateUrl: 'searchuser.html',

})
export class SearchuserPage {
  i = 0
	userList: any;
	usrData: any;
  q: any;
  userPhoto: any;
  objKeys: any;
  usersArray:any;
  indivUsernames: any;
  blockKeys: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public uInfo: UserInfoProvider) {

        var usrId = this.uInfo.getUserInfo().id;
        this.usrData = this.uInfo.getUserInfo();
  	     this.userList = this.uInfo.getUserNames();

          this.objKeys = Object.keys(this.userList)
          this.blockKeys = Object.keys(this.usrData.blocked)
         this.getPhotos();
         console.log("usernames",this.userList);
         this.usersArray = [];
         this.indivUsernames = [];
            for(var i in this.objKeys){
            for(var j in this.blockKeys){
             if(this.objKeys[i] == this.blockKeys[j] || this.objKeys[i] == this.usrData.id){
               delete this.userList[this.objKeys[i]]
             }
          }
        }
          for(var k in this.userList){
             var obj = {};
             obj[k] = this.userList[k].username
             this.usersArray.push(obj);

             this.indivUsernames.push({"username": this.userList[k].username,
              "id": k});
         }


        console.log("array of users",this.usersArray);
        console.log("indiv usernames",this.indivUsernames);
        this.userList = [];
  }
  //------------SEARCHING USERS--------------------
  searchUsers(searchbar){
  	 this.userList = this.indivUsernames
  	 this.q = searchbar.srcElement.value;
  	console.log('searching...',this.q);
  	if (!this.q) {
      this.userList = [];
      return};

  	if (String(this.q).replace(/\s/g,"").length ==0){
      this.userList = [];
  		return true;
  	}
  	this.userList = this.userList.filter((v) => {
  		if(v.username && this.q){
  			if (v.username.toLowerCase().indexOf(this.q.toLowerCase()) > -1){
  				return true;
  			}
  			return false;
  			}

  	});
  }
//-------------GO TO SENDFEED PAGE---------------
  goToSend(user){
  	this.navCtrl.push("SendfeedPage",{
  		param1: user
  	});
  	this.usrData = user;
}

 async getPhotos(){
    this.userPhoto = [];
     for(var i in this.objKeys){
         await firebase.storage().ref('profiles').child(this.objKeys[i] + ".jpg").getDownloadURL().then(success =>{
             this.userPhoto[this.objKeys[i]] = success;
       },
       fail =>{
          this.userPhoto[this.objKeys[i]] = 'http://debut.careers/wp-content/uploads/2017/04/Profile-Fallback-01-01.png?x28372';
       });
    }
    for(var j in this.indivUsernames){
      this.indivUsernames[j].photourl = this.userPhoto[this.indivUsernames[j].id]
    }
}

// creatingData(photourl){


//          console.log("data creating complete",this.indivUsernames);
// }
}
