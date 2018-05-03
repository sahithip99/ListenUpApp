import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessageDetailPage } from './message-detail';
// import { IonicImageLoader } from 'ionic-image-loader';


@NgModule({
  declarations: [
    MessageDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MessageDetailPage),
    // IonicImageLoader
  ],
})
export class MessageDetailPageModule {}
