import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { User } from '../../shared/user';
import { Storage } from '@ionic/storage';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { LoginPage } from '../login/login';
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
  private dato1: string;
  private dato2: string;
  private dato3: string;
  private dato4: string;

  private alertCtrl: AlertController;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: UserProvider,
    private storage: Storage,
    private app : App,
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.getDataProfile();

  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter ProfilePage');
    this.getDataProfile();
  }

  goEditProfile(): void {
    console.log("entre");
    this.navCtrl.push(EditProfilePage);
  }

  getErrorHandler(errmess) {
    const registerErrorAlert = this.alertCtrl.create(
      { title: 'Error in your profile...', subTitle: errmess.message, buttons: ['Dismiss'] });
    registerErrorAlert.present();
  }

  getDataProfile(): void {
    this.dato1 = "....";
    this.dato2 = "....";
    this.dato3 = "....";
    this.dato4 = "....";

    this.storage.get('currentUser').then(user => {
      if (user) {
        this.user2 = user;
        console.log('lololol' + this.user2.password);
        this.userProvider.getUser(this.user2.username).subscribe((resp) => {
          this.user2 = resp;
          this.dato1 = this.user2.first_name +' '+ this.user2.last_name;
          this.dato2 = this.user2.email;
          this.dato3 = this.user2.username;
          this.dato4 = this.user2.profile.about_me;

        }, errmess => this.getErrorHandler(errmess));
      }
    });
  }

  singOut(): void {
    this.userProvider.logOut().subscribe((resp) => {
      this.app.getRootNav().setRoot(LoginPage);
      this.userProvider.deleteToken();
    }, errmess => this.getErrorHandler(errmess));
  }

}
