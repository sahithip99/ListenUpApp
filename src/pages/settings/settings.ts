import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import { App,MenuController, MenuClose } from 'ionic-angular';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public app: App,public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
    //public alertCtrl: AlertController,
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }


  pushProfile(){
    var nav = this.app.getRootNav();
    nav.setRoot("ProfilePage");
  }

  pushFeedback(){
    var nav = this.app.getRootNav();
    nav.setRoot("FeedbackPage");
  }

  
  
}
