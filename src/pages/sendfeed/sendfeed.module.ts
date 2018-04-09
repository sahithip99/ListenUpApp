import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendfeedPage } from './sendfeed';
import {SearchuserPage} from '../searchuser/searchuser';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    SendfeedPage,
  ],
  imports: [
    IonicPageModule.forChild(SendfeedPage),
    SearchuserPage,
    HttpClientModule
  ],
})
export class SendfeedPageModule {}
