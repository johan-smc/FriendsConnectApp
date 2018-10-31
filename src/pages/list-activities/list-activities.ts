import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ActivityProvider} from '../../providers/activity/activity';
import { Activity} from '../../shared/activity';
import {ActivityDetailPage} from '../activity-detail/activity-detail';
/**
 * Generated class for the ListActivitiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-activities',
  templateUrl: 'list-activities.html',
})
export class ListActivitiesPage {
  searchQuery: string;
  private activities: Activity[];

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public activityProvider: ActivityProvider,
  ) {
    this.initializeActivities();
  }

  ionViewDidLoad() {}

  initializeActivities(val = '') {
    this.activities = [];
    this.activityProvider.getAllActivities().subscribe((resp) => {
      this.activities = resp;
      // if the value is an empty string don't filter the items
      if (val && val.trim() !== '') {
        this.activities = this.activities.filter((activity) => {
          return (activity.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
        console.log(this.activities);
      }
    }, errmess => this.getAllActivitiesErrorHandler(errmess));
  }
  setActivities(resp: Response): void {
    // TODO - Full capacity?
    const tam = resp['length'];
    for (let i = 0; i < tam; ++i) {
      this.activities.push(resp[i]);
    }
  }
  getAllActivitiesErrorHandler(errmess: {}): void {
    throw new Error('Method not implemented.');
  }
  onClickActivity(id: number) {
    this.navCtrl.push(ActivityDetailPage, {activityId: id});
  }

  getActivities(ev) {
    // Reset items back to all of the items
    // set val to the value of the searchbar
    const val = ev.target.value;
    this.initializeActivities(val);
  }
}
