import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ListActivitiesPage } from '../pages/list-activities/list-activities'
import { ActivityDetailPage } from '../pages/activity-detail/activity-detail';
import { ProfilePage } from '../pages/profile/profile';

import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserProvider } from '../providers/user/user';
import { ProcessHttpmsgProvider } from '../providers/process-httpmsg/process-httpmsg';

import { HttpClientModule } from '@angular/common/http';
import { RegistrarPage } from '../pages/registrar/registrar';
import { ActivityProvider } from '../providers/activity/activity';

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    TabsPage,
    LoginPage,
    RegistrarPage,
    ListActivitiesPage,
    ActivityDetailPage,
    ProfilePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    LoginPage,
    TabsPage,
    RegistrarPage,
    ListActivitiesPage,
    ActivityDetailPage,
    ProfilePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    ProcessHttpmsgProvider,
    ActivityProvider
  ]
})
export class AppModule {}
