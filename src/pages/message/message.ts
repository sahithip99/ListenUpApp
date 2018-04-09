import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatInfoProvider } from '../../providers/chat-info/chat-info';

@Component({
  selector: 'page-message',
  templateUrl: 'message.html'
})
export class MessagePage {

  constructor(
    public navCtrl: NavController,
    private chatInfo: ChatInfoProvider
  ) {
    
  }

}
