import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Activity } from '../../shared/activity';
import { ActivityProvider } from '../../providers/activity/activity';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the ActivityDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activity-detail',
  templateUrl: 'activity-detail.html',
})
export class ActivityDetailPage {
  
  getActivityErrorHandler(errmess: any): void {
    throw new Error("Method not implemented.");
  }

  private activity : Activity ;
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public activityProvider : ActivityProvider,
     private alertCtrl: AlertController,
     ) {
    
  }

  ionViewDidLoad() {
    console.log(this.navParams.get('activityId'));
    const activityId = this.navParams.get('activityId');
    this.activityProvider.getActivityById(activityId)
    .subscribe((resp) =>{
      console.log(typeof(resp));
      let activityRes = JSON.stringify(resp);
      this.activity = <Activity>JSON.parse(activityRes);
      console.log(this.activity);
      console.log(this.activity.id);
      console.log(this.activity.name);
    }
    , errmess => this.getActivityErrorHandler(errmess));
  }

  onSuscribe()
  {
    this.activityProvider.suscribeToActivity(this.activity.id)
    .subscribe((resp) =>{
      let suscribeSuccessAlert = this.alertCtrl.create({
        title: 'Yay!',
        subTitle: 'You has suscribe succesfull.',
        buttons: ['Dismiss']
      });
      suscribeSuccessAlert.present();
    }
    , errmess => this.getActivityErrorHandler(errmess));
  }

}
