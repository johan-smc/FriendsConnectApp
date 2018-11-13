import {Component} from '@angular/core';

import {ListActivitiesPage} from '../list-activities/list-activities';
import {CreateActivityPage} from '../create-activity/create-activity';
import {ProfilePage} from '../profile/profile';
import {MyActivitiesPage} from '../my-activities/my-activities';

@Component({templateUrl: 'tabs.html'})
export class TabsPage {
  tab1Root = ListActivitiesPage;
  tab2Root = ProfilePage;
  tab3Root = CreateActivityPage;
  tab4Root = MyActivitiesPage;

  constructor() {}
}
