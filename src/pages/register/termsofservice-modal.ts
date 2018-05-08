import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'termsofservice-modal.html'
})
export class TermsOfServiceModal {


  constructor(
              public viewCtrl: ViewController){

  }

  dismiss(isCreated){
    this.viewCtrl.dismiss(isCreated);
  }

}
