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
	constructor(public afAuth: AngularFireAuth, public afData: AngularFireDatabase){
		console.log('Hello UserInfoProvider Provider');
	}

	async setUserInfo(id){
		await this.afData.database.ref('users/' + id).once('value',dataSnap =>{
			this.usrData = dataSnap.val();
		})
	}

//-----------------Getters-----------------
getUserInfo(){
	return this.usrData;
}
}