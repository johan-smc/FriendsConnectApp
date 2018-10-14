import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../shared/user';
import { UserProvider } from '../../providers/user/user';
import { LoginPage } from '../login/login';

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

  public formRegister: FormGroup;
  private user: User = { 
    first_name: '',
    last_name: '',
    email:'',    
    username: '',
    password: '',
    profile: {about_me: "nada",rol: 1}
    
  };
  constructor
  (
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private userProvider: UserProvider,
  ) 
  {
    this.formRegister = this.formBuilder.group({
      // TODO - Add helper when required is not met.
      first_name: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
        ]
      ],
    last_name: ['', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
      ]
    ],
    email: ['', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
      ]
    ], 
      phone: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
        ]
      ],   
    username: ['', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
      ]
    ],
    password: ['', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
      ]
    ],
    repassword: ['', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
      //TODO repassword == pssword 
      ]
    ]
    });
  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad RegistrarPage');
  }

  loginErrorHandler(errmess: any) {
    let registerErrorAlert = this.alertCtrl.create({
      title: 'Ups...',
      subTitle: errmess.message,
      buttons: ['Dismiss']
    });
    registerErrorAlert.present();
  }

  onSubmitJoin():void {
    
    this.user.first_name = this.formRegister.get('first_name').value;
    this.user.last_name = this.formRegister.get('last_name').value;
    this.user.email = this.formRegister.get('email').value;    
    //this.user.phone = this.formRegister.get('phone').value;    
    this.user.username = this.formRegister.get('username').value;
    this.user.password = this.formRegister.get('password').value;
    this.user.profile = {about_me: "nada",rol: 1};
    console.log(this.user);
    this.userProvider.createUser(this.user).subscribe((resp) => {
      let registerSuccessAlert = this.alertCtrl.create({
        title: 'Yay!',
        subTitle: 'Join succesfull.',
        buttons: ['Dismiss']
      });
      registerSuccessAlert.present();
      this.navCtrl.setRoot(LoginPage);
    },
    errmess => this.loginErrorHandler(errmess) );

  }

}
