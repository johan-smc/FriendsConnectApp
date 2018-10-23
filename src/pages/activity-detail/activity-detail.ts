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
    this.loadActivity();  
  }

  private loadActivity():void {
    const activityId = this.navParams.get('activityId');
    console.log(this.activity);
    this.activityProvider.getActivityById(activityId)
      .subscribe((resp) => {
        let activityRes = JSON.stringify(resp);
        this.activity = <Activity>JSON.parse(activityRes);
      }
        , errmess => this.getActivityErrorHandler(errmess));
  }

  onSuscribe() {
    const alert = this.alertCtrl.create({
      title: 'Suscripción Exotosa',
      subTitle: 'Gracias Por Suscribirte!',
      buttons: ['OK']
    });
    alert.present();
    
  }

}
