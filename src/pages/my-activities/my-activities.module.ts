import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyActivitiesPage } from './my-activities';

@NgModule({
  declarations: [
    MyActivitiesPage,
  ],
  imports: [
    IonicPageModule.forChild(MyActivitiesPage),
  ],
})
export class MyActivitiesPageModule {}
