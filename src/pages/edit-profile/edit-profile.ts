import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  myForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder
    ) 
    {

      this.myForm = this.createMyForm();
     }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
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
          ]
        });
  }

  saveData(){
    console.log(this.myForm.value);
    console.log(this.myForm.value.last_name);
    
  }
  

}
