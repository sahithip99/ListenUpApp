import { Component } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {LoginPage} from '../../pages/login/login';
import { App,MenuController } from 'ionic-angular';
/**
 * Generated class for the HeaderMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'header-menu',
  templateUrl: 'header-menu.html'
})
export class HeaderMenuComponent {

  text: string;

  constructor(private afAuth: AngularFireAuth,public menuCtrl: MenuController,
              public app: App) {
    console.log('Hello HeaderMenuComponent Component');
    this.text = 'Hello World';
  }

logoutClicked(){
	console.log('Logout...')
	this.afAuth.auth.signOut();
	this.menuCtrl.close();
	var nav = this.app.getRootNav();
	nav.setRoot(LoginPage);
}
}
