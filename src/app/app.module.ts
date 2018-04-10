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

import { FeedbackPage } from '../pages/feedback/feedback';
import { MessagePage } from '../pages/message/message';
import { ProfilePage } from '../pages/profile/profile';
import { TabsPage } from '../pages/tabs/tabs';
import {LoginPage} from '../pages/login/login';
import {RegisterPage} from '../pages/register/register';
import {SendfeedPage} from '../pages/sendfeed/sendfeed';
import {SearchuserPage} from '../pages/searchuser/searchuser';
import {FeedbackinfoPage} from '../pages/feedbackinfo/feedbackinfo'

import {HeaderMenuComponent} from '../components/header-menu/header-menu';

import { UserInfoProvider } from '../providers/userInfo/userInfo';

import {PipesModule} from '../pipes/pipes.module';



@NgModule({
  declarations: [
    MyApp,
    FeedbackPage,
    MessagePage,
    ProfilePage,
    RegisterPage,
    TabsPage,
    LoginPage,
    SendfeedPage,
    SearchuserPage,
    FeedbackinfoPage,
    HeaderMenuComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FeedbackPage,
    MessagePage,
    ProfilePage,
    RegisterPage,
    TabsPage,
    SendfeedPage,
    SearchuserPage,
    FeedbackinfoPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    AngularFireDatabaseModule,
    UserInfoProvider,
    SearchuserPage
  ]
})
export class AppModule {}
