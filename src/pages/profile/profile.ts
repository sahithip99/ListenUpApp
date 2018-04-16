import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {UserInfoProvider} from '../../providers/userInfo/userInfo';
import { AngularFireDatabase } from 'angularfire2/database';
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  firstName: any;
  lastName: any;
  userName: any;
  usrInfo: any;
  param: any;
  captureDataUrl: string;
  constructor(public navCtrl: NavController, 
    public uInfo: UserInfoProvider,
    private Camera: Camera, 
    public navParams : NavParams,
    private afData: AngularFireDatabase) {
    this.loadUserInfo();
  }


  loadUserInfo(){
    this.usrInfo = this.uInfo.getUserInfo();
    if (this.usrInfo.firstname == undefined || this.usrInfo.firstname == null){
      setTimeout(() => {
        this.loadUserInfo();
      },1000);
    }
    else{
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
