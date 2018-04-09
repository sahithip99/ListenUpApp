import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendfeedPage } from './sendfeed';

@NgModule({
  declarations: [
    SendfeedPage,
  ],
  imports: [
    IonicPageModule.forChild(SendfeedPage),
  ],
})
export class SendfeedPageModule {}
