import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BlockusersPage } from './blockusers';

@NgModule({
  declarations: [
    BlockusersPage,
  ],
  imports: [
    IonicPageModule.forChild(BlockusersPage),
  ],
})
export class BlockusersPageModule {}
