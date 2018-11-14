import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, ViewController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Activity } from '../../shared/activity';
import { ActivityProvider } from '../../providers/activity/activity';

/**
 * Generated class for the EditActivityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-activity',
  templateUrl: 'edit-activity.html',
})
export class EditActivityPage {

  private readonly imgPlaceHolder = 'https://via.placeholder.com/100';
  previewImage = this.imgPlaceHolder;
  editActivityForm: FormGroup;
  activity: Activity;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private activityProvider: ActivityProvider,
    private toastCtrl: ToastController,
    private camera: Camera,
    private actionSheetCtrl: ActionSheetController,
    private viewCtrl: ViewController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder) {
    this.buildForm();
    }
    
    ionViewDidLoad() {
      this.fetchActivity(this.navParams.get('activityId'));
    }

  private fetchActivity(activityId: number): void {
    this.activityProvider.getActivityById(activityId).subscribe((resp) => {
      this.activity = resp;
      this.editActivityForm.patchValue(this.activity);
      if (this.activity.image) this.activity.image = 'data:image/jpeg;base64,' + this.activity.image;
      this.previewImage = this.activity.image || this.imgPlaceHolder;
      this.editActivityForm.patchValue( {
        begin_time: this.activity.begin_date,
        end_time: this.activity.end_date
      });
    });
  }

  /**
   * Sends the new information of the activity to the provider.
   */
  updateActivity():void {
    let newActivity = this.editActivityForm.value;
    console.log(newActivity);
    delete newActivity.begin_time;
    delete newActivity.end_time;
    newActivity.id = this.navParams.get('activityId');
    this.activityProvider.updateActivity(newActivity).subscribe((resp) => {
      if (this.previewImage !== this.previewImage) {
        this.postImageToActivity(newActivity.id);
      } else {
        this.presentToast();
      }
      this.viewCtrl.dismiss();
    }, errmess => this.updateActivitiesErrorHandler(errmess));
  }

  /**
   * Displays an alert based on the error's message.
   * @param {any} errmess JSON with error generated by the API.
   */
  updateActivitiesErrorHandler(errmess): void {
    const registerErrorAlert = this.alertCtrl.create(
      { title: 'Ups...', subTitle: errmess.error, buttons: ['Dismiss'] });
    registerErrorAlert.present();
  }

  /**
   * Sends the image to the data base.
   * @param {number} activityId ID of activity
   */
  private postImageToActivity(activityId: number): void {
    this.activityProvider.postImageToActivity(activityId, this.previewImage).subscribe((resp) => {
      this.presentToast();
      this.previewImage = this.imgPlaceHolder;
    });
  }

  /**
   * Builds the form and adds it's validators.
   */
  private buildForm(): void {
    this.editActivityForm = this.formBuilder.group({
      name: ['',
        [
          Validators.required, Validators.minLength(5), Validators.maxLength(20)
        ]
      ],
      description: ['',
        [
          Validators.required, Validators.minLength(5), Validators.maxLength(20)
        ]
      ],
      location: ['',
        [
          Validators.required, Validators.minLength(5), Validators.maxLength(20)
        ]
      ],
      begin_date: ['', [Validators.required]],
      begin_time: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      end_time: ['', [Validators.required]],
      max_participants: ['',
        [
          Validators.required, Validators.min(1), Validators.max(100)
        ]
      ]
    });
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

  private formatDate(date: Date) {
    let utc = (date.getTimezoneOffset() * -1) / 60;
    utc *= 100;
    let utcSign = '+';
    if (utc < 0) {
      utcSign = '-';
      utc *= -1;
    }
    const dateFormated: string =
      date.getFullYear()
      + '-' + (date.getMonth() + 1)
      + '-' + date.getDate()
      + 'T' + date.getHours()
      + ':' + date.getMinutes()
      + utcSign
      + '0' + utc;
    return dateFormated;
  }

  presentToast(): void {
    const toast = this.toastCtrl.create({
      message: 'Yay!, Activity Updated',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}
