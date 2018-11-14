import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../shared/user';
import { Storage } from '@ionic/storage';
import { UserProvider } from '../../providers/user/user';
import { ToastController } from 'ionic-angular';


/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  private userClass: User;
  private myForm: FormGroup;
  private nameuser: string = "temp";
  private lastnameuser: string;
  private aboutme: string;
  private pass: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private userProvider: UserProvider,
    private storage: Storage,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {

    this.myForm = this.createMyForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
    this.storage.get('currentUser').then(user => {
      if (user) {
        this.userClass = user;
        console.log('lololol' + this.userClass.password);
        this.pass = this.userClass.password;
        this.userProvider.getUser(this.userClass.username).subscribe((resp) => {
          this.userClass = resp;
          this.nameuser = this.userClass.first_name;
          this.lastnameuser = this.userClass.last_name;
          this.aboutme = this.userClass.profile.about_me;

          console.log("-----" + this.userClass.first_name);

        }, errmess => this.getErrorHandler(errmess));
      }
    });
  }

  getErrorHandler(errmess) {
    const registerErrorAlert = this.alertCtrl.create(
      { title: 'Error in your profile...', subTitle: errmess.message, buttons: ['Dismiss'] });
    registerErrorAlert.present();
  }

  private createMyForm(): FormGroup {
    return this.myForm = this.formBuilder.group(
      {
        first_name: [
          '',
          [
            Validators.required, Validators.minLength(4),
            Validators.maxLength(20)
          ]
        ],
        last_name: [
          '',
          [
            Validators.required, Validators.minLength(4),
            Validators.maxLength(20)
          ]
        ],
        about_me: [
          '',
          [
            Validators.required, Validators.minLength(4),
            Validators.maxLength(20)
          ]
        ],
        password: [
          '',
          [
            Validators.required, Validators.minLength(4),
            Validators.maxLength(20)
          ]
        ],
        repassword: [
          '',
          [
            Validators.required, Validators.minLength(4),
            Validators.maxLength(20)
          ]
        ]

      });
  }

  saveData() {
    console.log(this.myForm.value);
    console.log(this.myForm.value.last_name);

  }

  setDataProfile(): void {
    let tempUser: User;
    tempUser = this.userClass;
    console.log("INICIAL ", tempUser);
    tempUser.first_name = this.nameuser;
    console.log("2222");
    tempUser.last_name = this.lastnameuser;
    tempUser.profile.about_me = this.aboutme;
    console.log("FINAL ", tempUser);
    this.storage.get('currentUser').then(user => {
      if (user) {
        let s: string;
        this.userClass = user;
        this.userProvider.putUser(tempUser.username, tempUser).subscribe((resp) => {
          s = resp;
          console.log(s);
        }, errmess => this.getErrorHandler(errmess));
        this.presentToast();
        this.navCtrl.pop();
      }
    });

  }

  deleteAccount() {
    this.presentConfirm();
  }

  deleteRest() {
    
    let tempUser: User;
    
    tempUser = this.userClass;
    
    this.storage.get('currentUser').then(user => {
      if (user) {
        let s: string;
        this.userClass = user;
        this.userProvider.deleteUser(tempUser.username).subscribe((resp) => {
          s = resp;
          console.log(s);
        }, errmess => this.getErrorHandler(errmess));
        this.presentToast();
        this.navCtrl.pop();
      }
    });
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Do you want to delete your account?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          //color: 'Danger',
          handler: () => {
            console.log('Delete clicked');
            this.deleteRest();
          }
        }
      ]
    });
    alert.present();
  }


  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'User update successfully',
      duration: 1000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });


    toast.present();
  }


}
