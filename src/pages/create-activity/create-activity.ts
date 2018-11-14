import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, ActionSheetController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivityProvider } from '../../providers/activity/activity';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the CreateActivityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-activity',
  templateUrl: 'create-activity.html',
})
export class CreateActivityPage {

  private readonly imgPlaceHolder = 'https://via.placeholder.com/100';
  createActivityForm: FormGroup;
  previewImage = this.imgPlaceHolder;
  base64Image: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private activityProvider: ActivityProvider,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private camera: Camera,
    private actionSheetCtrl: ActionSheetController,
    private formBuilder: FormBuilder, ) {
    this.buildForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateActivityPage');
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
      this.base64Image = imageData;
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
      this.base64Image = imageData;
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log('Galery: ', base64Image);
      this.previewImage = base64Image;
    }, (err) => { console.log(err); });
  }

  /**
   * Creates a new activiy and stores it in the data base.
   */
  postActivity() {
    let newActivity = this.createActivityForm.value;
    console.log('Form Value: ', this.createActivityForm.value);
    
    newActivity.begin_date = this.formatDate(new Date(this.createActivityForm.value.begin_date + ' ' + this.createActivityForm.value.begin_time));
    newActivity.end_date = this.formatDate(new Date(this.createActivityForm.value.end_date + ' ' + this.createActivityForm.value.end_time));
    delete newActivity.begin_time;
    delete newActivity.end_time;
    this.activityProvider.postActivity(newActivity).subscribe((resp) => {
      this.createActivityForm.reset();
      if(this.previewImage !== this.previewImage) {
        this.postImageToActivity(resp.id);
      } else {
        this.presentToast();
      }

    }, errmess => this.postActivitiesErrorHandler(errmess));
  }
  
  /**
   * Sends the image to the data base.
   * @param {number} activityId ID of activity
   */
  private postImageToActivity(activityId: number):void {

    this.activityProvider.postImageToActivity(activityId, this.base64Image).subscribe((resp) => {
      this.presentToast();
      this.previewImage = this.imgPlaceHolder;
    });
  }

  /**
   * Builds the form and adds it's validators.
   */
  private buildForm(): void {
    this.createActivityForm = this.formBuilder.group({
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
      location: ['Javeriana',
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

  presentToast(): void {
    const toast = this.toastCtrl.create({
      message: 'Yay!, Activity Created',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  /**
   * Displays an alert based on the error's message.
   * @param {any} errmess JSON with error generated by the API.
   */
  postActivitiesErrorHandler(errmess): void {
    const registerErrorAlert = this.alertCtrl.create(
      { title: 'Ups...', subTitle: errmess.error, buttons: ['Dismiss'] });
    registerErrorAlert.present();
  }

  private formatDate(date: Date) {
    let utc = (date.getTimezoneOffset() * -1) / 60;
    utc *= 100;
    let utcSign = '+' ;
    if( utc < 0 ) {
        utcSign = '-';
        utc*=-1;
    }
    const dateFormated: string = 
          date.getFullYear() 
          + '-' + (date.getMonth() + 1) 
          + '-' + date.getDate() 
          + 'T' + date.getHours() 
          + ':' + date.getMinutes()
          + utcSign
          + '0' + utc;
    console.log('Formated Date: ', dateFormated);
    
    return dateFormated;
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
