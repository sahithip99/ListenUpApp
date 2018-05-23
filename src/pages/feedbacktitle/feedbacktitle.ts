import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FeedbacktitlePage page.
 *d
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feedbacktitle',
  templateUrl: 'feedbacktitle.html',
})
export class FeedbacktitlePage {
param: any;
firstName: any;
lastName: any;
photoUrl: any;
userName: any;
mesData: any = {
   title: "",
   message: ""
}
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.firstName = this.navParams.get('firstName');
  	this.lastName = this.navParams.get('lastName');
  	this.param = this.navParams.get('param');
  	this.photoUrl = this.param.photourl;
  	this.userName = this.param.username;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbacktitlePage');
  }

}
