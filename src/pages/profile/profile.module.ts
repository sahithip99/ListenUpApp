import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
//import { BarcodeScanner } from '@ionic-native/barcode-scanner';
// import { IonicImageLoader } from 'ionic-image-loader';


@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    // IonicImageLoader
  ],
  exports: [
      ProfilePage
  ],
  entryComponents: [
      ProfilePage
  ]
})
export class ProfilePageModule {}
