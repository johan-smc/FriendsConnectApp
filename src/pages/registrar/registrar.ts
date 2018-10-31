import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';

import {UserProvider} from '../../providers/user/user';
import {PasswordValidation} from '../../shared/passwordValidator';
import {User} from '../../shared/user';
import {UserRoles} from '../../shared/userRoles';
import {LoginPage} from '../login/login';

/**
 * Generated class for the RegistrarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
})
export class RegistrarPage {
  formRegister: FormGroup;
  private user: User;
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private formBuilder: FormBuilder,
      private alertCtrl: AlertController,
      private userProvider: UserProvider,
  ) {
    this.buildRegisterForm();
  }

  ionViewDidLoad() {}

  /**
   * Displays an alert based on the error's message.
   * @param {any} errmess JSON with error generated by the API.
   */
  loginErrorHandler(errmess) {
    const registerErrorAlert = this.alertCtrl.create(
        {title: 'Ups...', subTitle: errmess.message, buttons: ['Dismiss']});
    registerErrorAlert.present();
  }

  /**
   * Handles the submit button. Takes the values from the form
   * and uses the User Service to send the information to create
   * a new user.
   */
  onSubmitJoin(): void {
    this.user = this.formRegister.value;
    delete this.user.confirmPassword;
    this.user.profile = {
      about_me: 'Something about me',
      rol: UserRoles.General
    };
    this.userProvider.createUser(this.user).subscribe((resp) => {
      const registerSuccessAlert = this.alertCtrl.create(
          {title: 'Yay!', subTitle: 'Join succesfull.', buttons: ['Dismiss']});
      registerSuccessAlert.present();
      this.navCtrl.setRoot(LoginPage);
    }, errmess => this.loginErrorHandler(errmess));
  }

  /**
   * Builds a new form to gather the user's information.
   */
  private buildRegisterForm(): void {
    this.formRegister = this.formBuilder.group(
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
          email: [
            '',
            [
              Validators.required, Validators.minLength(4),
              Validators.maxLength(20)
            ]
          ],
          username: [
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
}
