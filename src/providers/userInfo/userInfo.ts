import { HttpClient } from '@angular/common/http';
//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

//import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

@Injectable()

export class UserInfoProvider{
	usrData: any;
	usrNames: any;
	usrGroup: any;
	constructor(public afAuth: AngularFireAuth, public afData: AngularFireDatabase){
		console.log('Hello UserInfoProvider Provider');
		this.setUsers();
		this.setNameInfo();
	}


	async setUserInfo(user){
		await this.afData.database.ref('users/' + user.uid).once('value',dataSnap =>{
			this.usrData = dataSnap.val();
			console.log("loaded current user: ", this.usrData);
		});
	}

	async setUsers(){
    await this.afData.database.ref('users').once('value',dataSnap =>{
      this.usrGroup = dataSnap.val();
      console.log('All the users:',this.usrGroup);
    })
  }

	async setNameInfo(){
		await this.afData.database.ref('usernames').once('value',dataSnap =>{
			this.usrNames = dataSnap.val();
		})
	}


//-----------------Getters-----------------
getUserInfo(){
	return this.usrData;
}

allUsers(){
	return this.usrGroup;
}
getUserNames(){
	return this.usrNames;
}
}