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

import {HeaderMenuComponent} from '../components/header-menu/header-menu';

import { UserInfoProvider } from '../providers/userInfo/userInfo';
import { Camera } from '@ionic-native/camera';



@NgModule({
  declarations: [
    MyApp,
    FeedbackPage,
    MessagePage,
    ProfilePage,
    RegisterPage,
    TabsPage,
    LoginPage,
    HeaderMenuComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FeedbackPage,
    MessagePage,
    ProfilePage,
    RegisterPage,
    TabsPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    AngularFireDatabaseModule,
    UserInfoProvider,
    Camera
  ]
})
export class AppModule {}
