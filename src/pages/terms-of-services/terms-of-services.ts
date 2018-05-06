import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  templateUrl: 'terms-of-services.html'
})
export class TermsOfServicesPage {


  constructor(public afData: AngularFireDatabase
              ,public viewCtrl: ViewController){

  }

  dismiss(isCreated){
    this.viewCtrl.dismiss(isCreated);
  }

}
