import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ModalController } from 'ionic-angular';
import { ActivityProvider } from '../../providers/activity/activity';
import { Activity} from '../../shared/activity';
import { ToastController, AlertController } from 'ionic-angular';
import { CommentsPage } from '../comments/comments';
import { User } from '../../shared/user';

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
  user: User;
  constructor(
    private activityProvider: ActivityProvider,
    private storage: Storage,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) { 
    this.loadUser();
  }

  ionViewDidLoad() {
  }
  loadUser(): void {
    this.storage.get('user').then(user => {
      this.user = user;
      console.log(this.user);
    });
  }
  ionViewWillEnter(){
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
        this.changeActivityInUnSuscribe(activityId, -1, true);
      }, errmess => this.getAllActivitiesErrorHandler(errmess));
    });
  }


  unSubscribeHandler(activityId: number): void {
    this.storage.get('user').then(user => {
      this.activityProvider.unSubscribeToActivity(activityId, user.username).subscribe((resp) => {
        this.showConfirmUnSubscriptionToast();
        this.changeActivityInUnSuscribe(activityId, resp.participants, false);
      }, errmess => this.getAllActivitiesErrorHandler(errmess));
    });
  }
  /**
   * Change activity participants in un suscribe
   * @param activityId 
   */
  changeActivityInUnSuscribe(activityId: number, participants: number, isParticipant: boolean): void {
    let activity = this.activities.find(item => item.id === activityId);
    activity.participants = participants;
    activity.is_current_user_subscribed = isParticipant;
    activity = this.showedActivities.find(item => item.id === activityId );
    activity.participants = participants;
    activity.is_current_user_subscribed=isParticipant;
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
  /**
   * Shows a confirmation if the un subscription is successful.
   */
  private showConfirmUnSubscriptionToast(): void {
    const toast = this.toastCtrl.create({
      message: 'Un Subscription successfully',
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
