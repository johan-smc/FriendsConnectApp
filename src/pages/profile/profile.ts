import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { User } from '../../shared/user';
import { Storage } from '@ionic/storage';
import { EditProfilePage} from '../edit-profile/edit-profile';
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
    private storage: Storage
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    //this.dato1 = "Nombre: ";
    //this.dato2 = "Correo: ";
    //this.dato3 = "Username: ";
    //this.dato4 = "Descripción: ";


  }

  goEditProfile():void 
  {
    console.log("entre");
    this.navCtrl.push(EditProfilePage);
  }

  getErrorHandler(errmess) {
    const registerErrorAlert = this.alertCtrl.create(
      { title: 'Error in your profile...', subTitle: errmess.message, buttons: ['Dismiss'] });
    registerErrorAlert.present();
  }

  getDataProfile(): void 
  {
    console.log('Boton');
    
    this.dato1="cambio1";
    this.dato2="cambio2";
    this.dato3="cambio3";
    this.dato4="cambio4";
    console.log("---" + this.dato1);
    


    this.storage.get('currentUser').then(user => {
      if (user) 
      {
          this.user2 = user;
          console.log('aaaaaaaaaa' + this.user2);
          this.userProvider.getUser(this.user2.username).subscribe((resp) => {
          this.user2 = resp;
          this.dato1 = this.user2.first_name + this.user2.last_name;
          //this.dato2 = this.user2.email;
          //this.dato3 = this.user2.username;
          //this.dato4 = this.user2.profile.about_me;

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
