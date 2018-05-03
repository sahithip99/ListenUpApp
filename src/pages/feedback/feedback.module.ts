import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedbackPage } from './feedback';
// import { IonicImageLoader } from 'ionic-image-loader';


@NgModule({
  declarations: [
    FeedbackPage,
  ],
  imports: [
    IonicPageModule.forChild(FeedbackPage),
    // IonicImageLoader
  ],
  exports: [
    FeedbackPage
  ],
  entryComponents: [
    FeedbackPage
  ]
})
export class FeedbackPageModule {}
