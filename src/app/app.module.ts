import {HttpClientModule} from '@angular/common/http';
import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {IonicStorageModule} from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {ForgotPasswordPage} from '../pages/forgot-password/forgot-password';
import {ListActivitiesPage} from '../pages/list-activities/list-activities';
import {LoginPage} from '../pages/login/login';
import {ProfilePage} from '../pages/profile/profile';
import {RegistrarPage} from '../pages/registrar/registrar';
import {TabsPage} from '../pages/tabs/tabs';
import {ValidateCodePage} from '../pages/validate-code/validate-code';
import {CommentsPage} from '../pages/comments/comments';
import {CreateActivityPage} from '../pages/create-activity/create-activity';

import {ActivityProvider} from '../providers/activity/activity';
import {ProcessHttpmsgProvider} from '../providers/process-httpmsg/process-httpmsg';
import {UserProvider} from '../providers/user/user';
import {EditProfilePage} from '../pages/edit-profile/edit-profile';
import {MyActivitiesPage} from '../pages/my-activities/my-activities';

import {MyApp} from './app.component';
import { CommentProvider } from '../providers/comment/comment';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    LoginPage,
    CreateActivityPage,
    RegistrarPage,
    ListActivitiesPage,
    ProfilePage,
    ForgotPasswordPage,
    ValidateCodePage,
    EditProfilePage,
    CommentsPage,
    MyActivitiesPage,
  ],
  imports: [
    BrowserModule, IonicModule.forRoot(MyApp), HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    CreateActivityPage,
    TabsPage,
    RegistrarPage,
    ListActivitiesPage,
    ProfilePage,
    ForgotPasswordPage,
    ValidateCodePage,
    EditProfilePage,
    CommentsPage,
    MyActivitiesPage,
  ],
  providers: [
    StatusBar, SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}, UserProvider,
    ProcessHttpmsgProvider, ActivityProvider,
    CommentProvider,
    Camera,
  ]
})
export class AppModule {
}
