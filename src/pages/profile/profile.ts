import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {UserInfoProvider} from '../../providers/userInfo/userInfo';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActionSheetController } from 'ionic-angular';
import * as firebase from 'firebase';
import {LoginPage} from '../../pages/login/login';
import { App,MenuController } from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  options: BarcodeScannerOptions;
  encodText:string='';
  encodedData:any={};
  scannedData:any={};
  firstName: any;
  lastName: any;
  userName: any;
  usrInfo: any;
  param: any;
  userPhoto: any;
  captureDataUrl: string;
  usrId: any;
  background: any;
  receivePho: any;
  constructor(public navCtrl: NavController,
    public uInfo: UserInfoProvider,
    private Camera: Camera,
    public navParams : NavParams,
    private afData: AngularFireDatabase,
    private actSheet: ActionSheetController,
    private afAuth: AngularFireAuth,
    private app: App,
    private alertCtrl: AlertController,public scanner:BarcodeScanner) {
    this.loadUserInfo();
    this.background = this.uInfo.getDefault();
    if(this.background){
      this.receivePho = this.uInfo.getPhoto();
    }
  }
    scan(){
      this.options={
        prompt: 'Scan your Barcode'
      };
      this.scanner.scan(this.options).then((data) => {
        this.scannedData = data;

      }, (err) => {
        console.log('Error :',err);
      })
    }
    encode(){
      this.scanner.encode(this.scanner.Encode.TEXT_TYPE, this.usrInfo.id).then((data) => {
        this.encodedData = data;
      }, (err) => {
          console.log('Error :',err);
      })
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
      this.receivePho = this.captureDataUrl;
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
      text: 'Gallery',
      role: 'upload',
      handler: () => {
        console.log("uploading photo clicked");
        this.capture(0);
      }
    },
    {
      text: 'Camera',
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

toFeedback(){
  this.navCtrl.push("SearchuserPage")
}


logoutClicked(){
  var alertCtrl = this.alertCtrl.create({
    title: 'Are you sure you want to log out?',
    buttons:[{
      text: "Logout",
      role: "Logout",
      handler: () => {
          console.log('Logout...')
          this.afAuth.auth.signOut();
          this.uInfo.clearUserInfo();
          var nav = this.app.getRootNav();
          nav.setRoot(LoginPage);
      }
    },
    {
      text: "Cancel",
      role: "cancel"
    }
    ]});
  alertCtrl.present();
}
}
