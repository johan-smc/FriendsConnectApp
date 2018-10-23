import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import { AlertController } from 'ionic-angular';
import { ListActivitiesPage } from '../list-activities/list-activities'
import { User } from '../../shared/user';
import { Storage } from '@ionic/storage';
import { RegistrarPage } from '../registrar/registrar';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: FormGroup;
  private user: User = { 
    first_name: '',
    last_name: '',
    email:'',
    //phone: '',    
    username: '',
    password: '',
    profile: {}
   };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private userProvider: UserProvider,
    private storage: Storage
  ) {

    storage.get('user').then(user => {
      if (user) {
        console.log(user);
        this.user = user;
        this.loginForm
          .patchValue({
            'username': this.user.username,
            'password': this.user.password
          });
      }
      else
        console.log('user not defined');
    });
  
    this.loginForm = this.formBuilder.group({
      // TODO - Add helper when required is not met.
      username: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
        ]
      ],
      password: ['', [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(20)
        ]
      ]
    });
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
  }

  /**
    * Displays an alert based on the error's message.
    * @param {any} errmess JSON with error generated by the API.
    */
  loginErrorHandler(errmess: any) {
    let registerErrorAlert = this.alertCtrl.create({
      title: 'Ups...',
      subTitle: errmess.message,
      buttons: ['Dismiss']
    });
    registerErrorAlert.present();
  }

  /**
   * Sends the field's information to validate in the API.
   */
  onSubmit():void {
    this.user.username = this.loginForm.get('username').value;
    this.user.password = this.loginForm.get('password').value;
    console.log(this.user);
    this.userProvider.loginUser(this.user)
    .subscribe((resp) => {
      let registerSuccessAlert = this.alertCtrl.create({
        title: 'Yay!',
        subTitle: 'Login succesfull.',
        buttons: ['Dismiss']
      });
      // TODOD - better than there
      this.userProvider.setUser(this.user);
      this.userProvider.setToken(resp['token']);
      // window.localStorage.setItem('token', resp['token']);
      // this.storage.set('user', this.user);
      registerSuccessAlert.present();
      this.navCtrl.setRoot(ListActivitiesPage);
    },
    errmess => this.loginErrorHandler(errmess) );
  }
  onSignup():void {
      this.navCtrl.push(RegistrarPage);
  }

}
