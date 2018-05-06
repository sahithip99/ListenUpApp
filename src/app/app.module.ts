import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {AngularFireModule} from "angularfire2";
import {AngularFireAuth } from "angularfire2/auth";
import { MyApp } from './app.component';
import {FIREBASE_CONFIG} from "./app.firebase.config";
import{AngularFireDatabaseModule} from 'angularfire2/database';

import { TabsPage } from '../pages/tabs/tabs';
import {LoginPage} from '../pages/login/login';
import {RegisterPage} from '../pages/register/register';
// import {SendfeedPage} from '../pages/sendfeed/sendfeed';
// import {SearchuserPage} from '../pages/searchuser/searchuser';
import {FeedbackinfoPage} from '../pages/feedbackinfo/feedbackinfo'
import {CreateuserPage} from '../pages/createuser/createuser';
import {BlockusersPage} from '../pages/blockusers/blockusers';
import {HeaderMenuComponent} from '../components/header-menu/header-menu';
import {TermsOfServicesPage} from '../pages/terms-of-services/terms-of-services';

import { UserInfoProvider } from '../providers/userInfo/userInfo';
import { Camera } from '@ionic-native/camera';


import { PipesModule } from '../pipes/pipes.module';
import { ChatInfoProvider } from '../providers/chat-info/chat-info';

// import { IonicImageLoader } from 'ionic-image-loader';



@NgModule({
  declarations: [
    MyApp,
    // FeedbackPage,
    // MessagePage,
    // ProfilePage,
    RegisterPage,
    TabsPage,
    LoginPage,
    // SendfeedPage,
    // SearchuserPage,
    FeedbackinfoPage,
    CreateuserPage,
    BlockusersPage,
    HeaderMenuComponent,
    TermsOfServicesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
        mode: 'ios',
        iconMode: 'ios'
    }),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    PipesModule,
    
    // IonicImageLoader.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RegisterPage,
    TabsPage,
    // SendfeedPage,
    // SearchuserPage,
    FeedbackinfoPage,
    CreateuserPage,
    BlockusersPage,
    LoginPage,
    TermsOfServicesPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    AngularFireDatabaseModule,
    UserInfoProvider,
    // SearchuserPage,
    Camera,
    ChatInfoProvider,
  ]
})
export class AppModule {}
