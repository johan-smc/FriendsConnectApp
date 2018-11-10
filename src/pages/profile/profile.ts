import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { User } from '../../shared/user';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  private user2: User;
  private alertCtrl: AlertController;
  constructor(

    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: UserProvider,
    private storage: Storage
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  getErrorHandler(errmess) {
    const registerErrorAlert = this.alertCtrl.create(
      { title: 'Error in your profile...', subTitle: errmess.message, buttons: ['Dismiss'] });
    registerErrorAlert.present();
  }

  getDataProfile(): void 
  {
    console.log('Boton');
    this.storage.get('currentUser').then(user => {
      if (user) 
      {
          this.user2 = user;
          console.log('aaaaaaaaaa' + this.user2);
          this.userProvider.getUser(this.user2.username).subscribe((resp) => {
          this.user2 = resp;
        }, errmess => this.getErrorHandler(errmess));
      }
    });
  }

  setDataProfile(): void
  {
    console.log('Boton2');
    var tempUser: User;
    tempUser = this.user2;
    console.log('11111' + tempUser);
    tempUser.first_name = 'pipi';
    tempUser.last_name = 'loco';
    console.log('22222' + tempUser);

    this.storage.get('currentUser').then(user => {
      if (user) 
      {
          var s : string;
          this.user2 = user;
          console.log('aaaaaaaaaa' + tempUser.username);
          this.userProvider.putUser(tempUser.username).subscribe((resp) => {
            s = resp;
            console.log(s);
        }, errmess => this.getErrorHandler(errmess));
      }
    });

  }
}
