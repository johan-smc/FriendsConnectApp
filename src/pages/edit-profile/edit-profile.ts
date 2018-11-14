import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController, ActionSheetController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../shared/user';
import { Storage } from '@ionic/storage';
import { UserProvider } from '../../providers/user/user';
import { ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Camera, CameraOptions } from '@ionic-native/camera';


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
  private newpass: string;
  private renewpass: string;
  private pass: string;
  private readonly imgPlaceHolder = '../../assets/imgs/useravatar.png';
  previewImage = this.imgPlaceHolder;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private userProvider: UserProvider,
    private actionSheetCtrl: ActionSheetController,
    private storage: Storage,
    private camera: Camera,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private app: App,
  ) {

    this.myForm = this.createMyForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
    this.storage.get('currentUser').then(user => {
      if (user) {
        this.userClass = user;
        console.log('lololol' + this.userClass.password);

        //this.pass = '';

        this.pass = this.userClass.password;
        this.newpass = this.pass;
        this.renewpass = this.pass;
        this.pass = '';
        this.userProvider.getUser(this.userClass.username).subscribe((resp) => {
          this.userClass = resp;
          this.nameuser = this.userClass.first_name;
          this.lastnameuser = this.userClass.last_name;
          this.aboutme = this.userClass.profile.about_me;
          if (this.userClass.profile.image) {
            this.previewImage = 'data:image/jpeg;base64,' + this.userClass.profile.image;
          }
          console.log("-----" + this.userClass.first_name);

        }, errmess => this.getErrorHandler(errmess));
      }
    });
  }

  /**
   * Sends the image to the data base.
   * @param {number} activityId ID of activity
   */
  private postImageToUser(username: string): void {
    this.userProvider.postImageToUser(username, this.previewImage).subscribe((resp) => {
      this.previewImage = this.imgPlaceHolder;
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
        newpassword: [
          '',
          [
            Validators.required, Validators.minLength(4),
            Validators.maxLength(20)
          ]
        ],
        renewpassword: [
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
    tempUser.first_name = this.nameuser;
    tempUser.last_name = this.lastnameuser;
    tempUser.profile.about_me = this.aboutme;
    tempUser.password = this.newpass;
    tempUser.confirmPassword = this.renewpass;
    console.log('First Temp User: ', tempUser);
    this.storage.get('currentUser').then(user => {
      if (user) {
        if (user.password == this.pass) {
          if (tempUser.password == tempUser.confirmPassword) {
            let s: string;
            this.userClass = user;
            this.userProvider.putUser(tempUser.username, tempUser).subscribe((resp) => {
              s = resp;
              if (this.previewImage !== this.previewImage && this.previewImage !== this.userClass.profile.image) {
                this.postImageToUser(tempUser.username);
                this.presentToast('Image Saved');
                this.navCtrl.pop();
              }
              console.log(s);
            }, errmess => this.getErrorHandler(errmess));
            this.presentToast('User update successfully');

            this.navCtrl.pop();
          }
          else {
            console.log('ERROR!! Contraseña Nueva no coincide');
            this.presentToast('ERROR!! Contraseña Nueva no coincide');
          }

        }
        else {
          console.log('ERROR!! Contraseña actual no coincide');
          this.presentToast('ERROR!! Contraseña actual no coincide');

        }
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
        if (user.password == this.pass) {
          let s: string;
          this.userClass = user;
          this.userProvider.deleteUser(tempUser.username).subscribe((resp) => {
            s = resp;
            console.log(s);
          }, errmess => this.getErrorHandler(errmess));
          this.presentToast('User delete successfully');
          //this.navCtrl.pop();
          this.app.getRootNav().setRoot(LoginPage);
          this.userProvider.deleteToken();
        }
        else {
          console.log('ERROR!! Contraseña no coincide');
          this.presentToast('ERROR!! Contraseña incorrecta');
        }

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


  presentToast(value: string) {
    let toast = this.toastCtrl.create({
      //message: 'User update successfully',
      message: value,
      duration: 2000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });


    toast.present();
  }

  /**
   * Opens the camera to add a picture. Sets the camara 
   * quality and gets the picture in base64.
   */
  openCamara() {
    const options: CameraOptions = {
      quality: 10,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log('Camera: ', base64Image);
      this.previewImage = base64Image;
    }, (err) => { console.log(err); });
  }

  /**
   * Opens the galery to add a picture. Sets the picture 
   * quality and gets the picture in base64.
   */
  openGalery() {
    const options: CameraOptions = {
      quality: 10,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log('Galery: ', base64Image);
      this.previewImage = base64Image;
    }, (err) => { console.log(err); });
  }


  /**
   * Displays the options for image to be uploaded.
   */
  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Upload Photo',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            console.log('Destructive clicked');
            this.previewImage = this.imgPlaceHolder;
          }
        }, {
          text: 'Take Picture',
          icon: 'camera',
          handler: () => {
            console.log('Take Picture clicked');
            this.openCamara();
          }
        }, {
          text: 'Upload From Library',
          icon: 'images',
          handler: () => {
            console.log('Upload clicked');
            this.openGalery();
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          icon: 'close',
          handler: () => { console.log('Cancel clicked'); }
        }
      ]
    });
    actionSheet.present();
  }


}
