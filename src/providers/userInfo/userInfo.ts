import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()

export class UserInfoProvider{
	usrData: any;
	usrNames: any;
	usrGroup: any;
	usrArray: any;
	userPhoto: any;
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

	clearUserInfo(){
		this.usrData = null;
		this.usrId = null;
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
  async setPhoto(id){
    await firebase.storage().ref('profiles').child(id + '.jpg').getDownloadURL().then(success =>{
      this.userPhoto = success;
    },
    fail => {
      this.userPhoto = 'https://firebasestorage.googleapis.com/v0/b/eoko-cc928.appspot.com/o/profiles%2Fdefault_avatar.jpg?alt=media&token=761a4187-2508-44fb-994c-9bd0b6842181'
}
    );
	}
	
	//LOAD OTHER PEOPLE INFORMATION
	getOtherUserInfo(otherID: string){
		let otherUser$ = this.afData.object(`users/${otherID}`).valueChanges()
		return otherUser$
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
getPhoto(){
	return this.userPhoto;
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
