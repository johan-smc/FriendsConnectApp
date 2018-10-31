import {HttpClientModule} from '@angular/common/http';
import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {IonicStorageModule} from '@ionic/storage';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {ActivityDetailPage} from '../pages/activity-detail/activity-detail';
import {ContactPage} from '../pages/contact/contact';
import {ListActivitiesPage} from '../pages/list-activities/list-activities';
import {LoginPage} from '../pages/login/login';
import {ProfilePage} from '../pages/profile/profile';
import {RegistrarPage} from '../pages/registrar/registrar';
import {TabsPage} from '../pages/tabs/tabs';
import {ActivityProvider} from '../providers/activity/activity';
import {ProcessHttpmsgProvider} from '../providers/process-httpmsg/process-httpmsg';
import {UserProvider} from '../providers/user/user';

import {MyApp} from './app.component';

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
    BrowserModule, IonicModule.forRoot(MyApp), HttpClientModule,
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
    StatusBar, SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}, UserProvider,
    ProcessHttpmsgProvider, ActivityProvider
  ]
})
export class AppModule {
}
