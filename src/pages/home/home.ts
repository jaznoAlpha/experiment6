import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import { AuthService } from '../../services/auth.service';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  isAuthenticated: boolean;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public events: Events,
              private authService: AuthService) {
    this.isAuthenticated = this.authService.isAuthenticated;
    events.subscribe('login', (authenticated) => {
      this.isAuthenticated = this.authService.isAuthenticated;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
