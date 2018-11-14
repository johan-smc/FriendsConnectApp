import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';

/**
 * Generated class for the ConversationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conversation',
  templateUrl: 'conversation.html',
})
export class ConversationPage {

  toUser ;
  user ;
  msgList ;
  activity ;
  relativeTime;
  title: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
     ) {
   

    this.loadDefault();
  }
  ionViewDidLoad() {
    this.title = this.navParams.get('data');
  }
  loadDefault()
  {
    
    //this.activity.name = this.navParams('data');

    this.storage.get('user').then(user => {
      this.user = this.toUser = user;
      this.user.id = 1;
      this.toUser.id = 2;
    });
    
    const msg = {
      "userName" : "William",
      "userId" : 1,
      "status" : "send",
      "time": "0",
      "message" :"Hey when are we meeting tonight?"
    };
    this.msgList = [];
    this.msgList.push(msg);
    this.relativeTime = ".";
  }

}
