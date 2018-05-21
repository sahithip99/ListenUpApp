import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedbacktitlePage } from './feedbacktitle';

@NgModule({
  declarations: [
    FeedbacktitlePage,
  ],
  imports: [
    IonicPageModule.forChild(FeedbacktitlePage),
  ],
  exports: [
  FeedbacktitlePage
  ]
})
export class FeedbacktitlePageModule {}
