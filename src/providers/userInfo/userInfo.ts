import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()

export class UserInfoProvider{
	usrData: any;
	usrNames: any;
	usrGroup: any;
	usrArray: any;
	usrId: any;
	constructor(public afAuth: AngularFireAuth, public afData: AngularFireDatabase){
		console.log('Hello UserInfoProvider Provider');
	}

//-----------------SET CURRENT USER'S INFORMATION--------------------
	 setUserInfo(user){
		 return this.afData.database.ref('users/' + user.uid).once('value',dataSnap =>{
			this.usrData = dataSnap.val();
			this.usrId = user.uid
			console.log("loaded current user: ", this.usrData);

		});
	}
//---------------ALL OF THE USERS---------------------------
	async setUsers(){
    await this.afData.database.ref('users').once('value',dataSnap =>{
      this.usrGroup = dataSnap.val();
      console.log('All the users:',this.usrGroup);
      this.usrArray = [];
      for(var i in this.usrGroup){
  		this.usrArray.push(this.usrGroup[i]);
  	}
    })
    return this.usrArray
  }
  
 //----------------------ALL OF THE USERNAMES-------------------
  async setNameInfo(){
		await this.afData.database.ref('usernames').once('value',dataSnap =>{
			this.usrNames = dataSnap.val();
		})
	}

//-----------------Getters-----------------
getUserInfo(){
	return this.usrData;
}
getUserId(){
	return this.usrId;
}
allUsers(){
	return this.usrGroup;
}
usersArray(){
	return this.usrArray;
}
getUserNames(){
	return this.usrNames;
}
}
