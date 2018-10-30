import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListActivitiesPage } from './list-activities';

@NgModule({
  declarations: [
    ListActivitiesPage,
  ],
  imports: [
    IonicPageModule.forChild(ListActivitiesPage),
  ],
})
export class ListActivitiesPageModule {}
