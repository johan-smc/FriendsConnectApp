import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ModalController } from 'ionic-angular';
import { ActivityProvider } from '../../providers/activity/activity';
import { Activity} from '../../shared/activity';
import { ToastController } from 'ionic-angular';
import { CommentsPage } from '../comments/comments';

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
  private activities: Activity[]; // all activities
  showedActivities: Activity[]; // activities to show in view
  constructor(
    private activityProvider: ActivityProvider,
    private storage: Storage,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) { }

  ionViewDidLoad() {
    this.initializeActivities();
  }

  /**
   * Gets all activityes from the server and assigns them to 
   * an array that represents the activities that are being 
   * displayed.
   */
  private initializeActivities(): void {
    this.activityProvider.getAllActivities().subscribe((resp) => {
      this.activities = resp;
      this.showedActivities = Object.assign([], this.activities);
    }, errmess => this.getAllActivitiesErrorHandler(errmess));
  }

  /**
   * Displays an alert based on the error's message.
   * @param {any} errmess JSON with error generated by the API.
   */
  getAllActivitiesErrorHandler(errmess): void {
    const registerErrorAlert = this.alertCtrl.create(
      { title: 'Ups...', subTitle: errmess.error, buttons: ['Dismiss'] });
    registerErrorAlert.present();
  }

  /**
   * When user makes a query, the string is used to filter through all the 
   * activities with a name that contains the query.
   * @param {string} query 
   */
  getActivities(query: string): void {
    if (query && query.trim() !== '') {
      this.showedActivities = this.activities.filter(activity => 
        activity.name.toLowerCase().includes(query.toLowerCase()));
    } else {
      this.showedActivities = Object.assign([], this.activities);
    }
  }

  subscribeHandler(activityId: number): void {
    this.storage.get('user').then(user => {
      this.activityProvider.subscribeToActivity(activityId, user.username).subscribe((resp) => {
        this.showConfirmSubscriptionToast();
      }, errmess => this.getAllActivitiesErrorHandler(errmess));
    });
  }

  /**
   * Shows a confirmation if the subscription is successful.
   */
  private showConfirmSubscriptionToast(): void {
    const toast = this.toastCtrl.create({
      message: 'Subscription successfully',
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }

  openCommentModal(activityId: number) {
    const commetModal = this.modalCtrl.create(CommentsPage, { activityId: activityId } );
    commetModal.present();
  }

}
