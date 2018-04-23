import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {UserInfoProvider} from '../../providers/userInfo/userInfo';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActionSheetController } from 'ionic-angular';

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
  userPhoto: any;
  captureDataUrl: string;
  constructor(public navCtrl: NavController, 
    public uInfo: UserInfoProvider,
    private Camera: Camera, 
    public navParams : NavParams,
    private afData: AngularFireDatabase,
    private actSheet: ActionSheetController) {
    this.loadUserInfo();
  }


  loadUserInfo(){
    this.usrInfo = this.uInfo.getUserInfo();
    if (this.usrInfo.firstname == undefined || this.usrInfo.firstname == null){
      console.log("try again to get user data");
      setTimeout(() => {
        this.loadUserInfo();
      },1000);
    }
    else{
    this.firstName = this.usrInfo.firstname;
    this.lastName = this.usrInfo.lastname;
    this.userName = this.usrInfo.username;
    this.userPhoto = this.usrInfo.photourl
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
      console.log("couldn't take photo!");
  });
}

setPhoto(){
  var actSheet = this.actSheet.create({
    title: 'Choose a Photo Option',
    buttons: [
    {
      text: 'Upload Your Photo',
      role: 'upload',
      handler: () => {
        console.log("uploading photo clicked");
      }
    },
    {
      text: 'Take Your Photo',
      role: 'take',
      handler : () => {
        console.log("clicked take photo");
        this.capture();
      }
    }
    ]
  })
}
}
