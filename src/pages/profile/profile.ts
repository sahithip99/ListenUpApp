import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';


import {UserInfoProvider} from '../../providers/userInfo/userInfo';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  firstName: any;
  lastName: any;
  userName: any;
  usrInfo: any;
  captureDataUrl: string;
  constructor(public navCtrl: NavController, public uInfo: UserInfoProvider,private Camera: Camera) {
    this.loadUserInfo();
  }

//----------------WHEN LOADING AND USER INFORMATION IS UNDEFINED, RELAOD AGAIN AFTER 1 SECOND---------------
  loadUserInfo(){
    this.usrInfo = this.uInfo.getUserInfo();
    if (this.usrInfo == undefined || this.usrInfo == null){
      setTimeout(() => {
        console.log("try again");
        this.loadUserInfo();
      },1000);
    }
    else{
      console.log("hit there",this.usrInfo)
      this.firstName = this.usrInfo.firstname;
      this.lastName = this.usrInfo.lastname;
      this.userName = this.usrInfo.username;
    }
  }


capture(){
const cameraOptions: CameraOptions = {
  quality: 50,
  destinationType: this.Camera.DestinationType.DATA_URL,
  encodingType: this.Camera.EncodingType.JPEG,
  mediaType: this.Camera.MediaType.PICTURE,
  };

  this.Camera.getPicture(cameraOptions).then((imageData) => {
  this.captureDataUrl = 'data:image/jpeg;base64,'+ imageData;
  }, (err) => {

  });
}
}
