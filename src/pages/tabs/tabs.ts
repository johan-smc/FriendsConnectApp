import {Component} from '@angular/core';

import {ContactPage} from '../contact/contact';
import {ListActivitiesPage} from '../list-activities/list-activities';
import {ProfilePage} from '../profile/profile';
import {MyActivitiesPage} from '../my-activities/my-activities';
import {ListChatsPage} from '../list-chats/list-chats'

@Component({templateUrl: 'tabs.html'})
export class TabsPage {
  tab1Root = ListActivitiesPage;
  tab2Root = ProfilePage;
  tab3Root = ContactPage;
  tab4Root = MyActivitiesPage;
  tab5Root = ListChatsPage;

  constructor() {}
}
