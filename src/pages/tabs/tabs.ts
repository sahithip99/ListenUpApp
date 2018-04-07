import { Component } from '@angular/core';

import { FeedbackPage } from '../feedback/feedback';
import { MessagePage } from '../message/message';
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ProfilePage;
  tab2Root = FeedbackPage;
  tab3Root = MessagePage;

  constructor() {

  }
}
