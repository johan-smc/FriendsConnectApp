import { Component } from '@angular/core';

import { ProfilePage } from '../profile/profile';
import { ContactPage } from '../contact/contact';
import { ListActivitiesPage } from '../list-activities/list-activities';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ListActivitiesPage;
  tab2Root = ProfilePage;
  tab3Root = ContactPage;

  constructor() {

  }
}
