import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the SendfeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-sendfeed',
  templateUrl: 'sendfeed.html',
})
export class SendfeedPage {
	 param: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.param = this.navParams.get('param1');
  	console.log(this.param);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendfeedPage');
  }	

}
