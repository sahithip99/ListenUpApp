import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {UserInfoProvider} from '../../providers/userInfo/userInfo';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActionSheetController } from 'ionic-angular';
import * as firebase from 'firebase';

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
     if(!this.usrInfo){
       setTimeout(() => {
        this.loadUserInfo();
      },1000);
    }
    else{
    this.firstName = this.usrInfo.firstname;
    this.lastName = this.usrInfo.lastname;
    this.userName = this.usrInfo.username;
    this.userPhoto = this.uInfo.getPhoto();
    }
  }


  capture(sourcetype){
  const cameraOptions: CameraOptions = {
    quality: 50,
    destinationType: this.Camera.DestinationType.DATA_URL,
    encodingType: this.Camera.EncodingType.JPEG,
    mediaType: this.Camera.MediaType.PICTURE,
    sourceType: sourcetype
    };

    this.Camera.getPicture(cameraOptions).then((imageData) => {
      this.captureDataUrl = 'data:image/jpeg;base64,'+ imageData;
      this.upload();
    }, (err) => {

    });
  }

  upload() {
      let storageRef = firebase.storage().ref(); //reference to storage database
      const imageRef = storageRef.child(`profiles/${this.uInfo.getUserId()}.jpg`);
      imageRef.putString(this.captureDataUrl,firebase.storage.StringFormat.DATA_URL).then((snapshot)=>{
      });
      this.afData.database.ref("users").child(this.usrInfo.id).update({
        photourl: this.captureDataUrl
      });
    }


setPhoto(){
  var actSheet = this.actSheet.create({
    title: 'Choose a Photo Option',
    buttons: [
    {
      text: 'Choose from gallery',
      role: 'upload',
      handler: () => {
        console.log("uploading photo clicked");
        this.capture(0);
      }
    },
    {
      text: 'Take Your Photo',
      role: 'take',
      handler : () => {
        console.log("clicked take photo");
        this.capture(1);
      }
    },
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log("cancel clicked");
      }
    }
    ]
  });
  actSheet.present();
}


}
