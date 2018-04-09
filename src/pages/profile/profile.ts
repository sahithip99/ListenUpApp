import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  constructor(public navCtrl: NavController
    ,private Camera: Camera
  ) {

  }

captureDataUrl: string;
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
