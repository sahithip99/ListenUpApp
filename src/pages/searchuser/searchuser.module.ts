import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchuserPage } from './searchuser';

@NgModule({
  declarations: [
    SearchuserPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchuserPage),
  ],
  exports: [
    SearchuserPage
  ],
  entryComponents: [
    SearchuserPage
  ]
})
export class SearchuserPageModule {}
