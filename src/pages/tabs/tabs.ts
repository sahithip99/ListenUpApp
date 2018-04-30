import { Component } from '@angular/core';



@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root: any = "ProfilePage";
  tab2Root: any = "FeedbackPage";
  tab3Root: any = "MessagePage";

  constructor() {

  }
}
