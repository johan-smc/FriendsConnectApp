import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {ToastController} from 'ionic-angular';

import {UserProvider} from '../../providers/user/user';
import {ForgotPasswordData} from '../../shared/forgotPasswordData';
import {PasswordValidation} from '../../shared/passwordValidator';
import {regexEmail, regexNumbers} from '../../shared/regexs';
import {LoginPage} from '../login/login';


/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  fogotPasswordForm: FormGroup;
  private data: ForgotPasswordData;
  private sendEmail: boolean;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private formBuilder: FormBuilder,
      private userProvider: UserProvider,
      private alertCtrl: AlertController,
      public toastCtrl: ToastController,
  ) {
    this.buildForgotForm();
    this.sendEmail = false;
  }

  ionViewDidLoad() {}

  /**
   * Builds the forgot form and adds it's validators.
   */
  private buildForgotForm(): void {
    this.fogotPasswordForm = this.getFormEmail();
  }
  /**
   * Return form with only email
   */
  private getFormEmail(): FormGroup {
    return this.formBuilder.group({
      email: [
        '',
        [
          Validators.required, Validators.minLength(4),
          Validators.maxLength(30), Validators.pattern(regexEmail)
        ]
      ]
    });
  }
  /**
   * Return form with all params
   */
  private getFormChangePassword(): FormGroup {
    return this.formBuilder.group(
        {
          email: [
            '',
            [
              Validators.required, Validators.minLength(4),
              Validators.maxLength(30), Validators.pattern(regexEmail)
            ]
          ],
          code: [
            '',
            [
              Validators.required, Validators.minLength(6),
              Validators.maxLength(6), Validators.pattern(regexNumbers)
            ]
          ],
          password: [
            '',
            [
              Validators.required, Validators.minLength(4),
              Validators.maxLength(20)
            ]
          ],
          confirmPassword: [
            '',
            [
              Validators.required, Validators.minLength(4),
              Validators.maxLength(20)
            ]
          ]
        },
        {validator: PasswordValidation.MatchPassword});
  }
  /**
   * Sends the field's information to validate in the API and
   * goes to the tabs view.
   */
  onSubmit(): void {
    this.data = this.fogotPasswordForm.value;
    this.data.email = this.data.email.toLowerCase();
    if (this.sendEmail === false) {
      this.sendEmailForgotPassword();
    } else {
      this.changePasswordWithCode();
    }
  }
  /**
   * Displays an alert based on the error's message.
   * @param {any} errmess JSON with error generated by the API.
   */
  ErrorHandler(errmess) {
    let messageError = '';


    if (errmess.error['email'] !== undefined) {
      messageError = 'Email not found.';
    } else if (errmess.error['code'] !== undefined) {
      messageError = 'Code wrong.';
    } else {
      messageError = 'Contact to admin.';
    }
    const registerErrorAlert = this.alertCtrl.create(
        {title: 'Ups...', subTitle: messageError, buttons: ['Dismiss']});
    registerErrorAlert.present();
  }
  /**
   * Displays an alert based on the error's message.
   * @param {any} errmess JSON with error generated by the API.
   */
  ErrorHandlerEmail(errmess) {
    const registerErrorAlert = this.alertCtrl.create(
        {title: 'Ups...', subTitle: 'Email Not found', buttons: ['Dismiss']});
    registerErrorAlert.present();
  }

  /*
   * Display toast
   */
  presentToast(messageIn: string, durationIn: number, positionIn = 'down') {
    const toast = this.toastCtrl.create(
        {message: messageIn, duration: durationIn, position: positionIn});
    toast.present();
  }


  /**
   * Send email for request code for new password
   */
  sendEmailForgotPassword(): void {
    this.userProvider.fogotPassword(this.data.email).subscribe((resp) => {
      this.presentToast('Yay! Email send succesfull.', 3000);
      this.changeButton();
    }, errmess => this.ErrorHandlerEmail(errmess));
  }
  /**
   * Send data for request chage password with a validate code
   */
  changePasswordWithCode(): void {
    this.userProvider.resetPassword(this.data).subscribe((resp) => {
      this.presentToast('Yay! Password change send succesfull.', 3000);
      // TODO - Go to tabs pague
      this.navCtrl.setRoot(LoginPage);
    }, errmess => this.ErrorHandler(errmess));
  }
  /**
   * Change button for send email or chage password
   */
  changeButton(): void {
    this.data = this.fogotPasswordForm.value;
    this.sendEmail = !this.sendEmail;
    if (this.sendEmail) {
      this.fogotPasswordForm = this.getFormChangePassword();
    } else {
      this.fogotPasswordForm = this.getFormEmail();
    }
    this.fogotPasswordForm.patchValue({'email': this.data.email});
  }
}
