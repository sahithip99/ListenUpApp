import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessagePage } from './message';
// import { IonicImageLoader } from 'ionic-image-loader';


@NgModule({
  declarations: [
    MessagePage,
  ],
  imports: [
    IonicPageModule.forChild(MessagePage),
    // IonicImageLoader
  ],
  exports: [
      MessagePage
  ],
  entryComponents: [
      MessagePage
  ]
})
export class MessagePageModule {}
