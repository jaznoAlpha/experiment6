//Angular
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

//Ionic
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

//Services
import { AuthService } from '../../services/auth.service';


@IonicPage()
@Component({
  selector: 'page-modal-login',
  templateUrl: 'modal-login.html',
})
export class ModalLoginPage {
  

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public events: Events,
              private authService: AuthService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {
    // this.authCheck();
  }

  ionViewDidLoad() {
    console.log(this.authService.isAuthenticated);
    this.authCheck();
  }

  onLogin(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Logging you in'
    });
    loading.present();
    this.authService.signin(form.value.email, form.value.password)
      .then(data => {
        this.authService.isAuthenticated = true;
        loading.dismiss();
        this.authCheck();
        this.events.publish('login', this.authService.isAuthenticated);
        console.log(data);
      })
      .catch(error => {
        this.authService.isAuthenticated = false;
        loading.dismiss();
        this.authCheck();
        this.events.publish('login', this.authService.isAuthenticated);
        const alert = this.alertCtrl.create({
          title: 'Login failed!',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });
  }

  onLogout() {
    this.authService.isAuthenticated = false;
    this.authService.signout();
    this.authCheck();
    this.events.publish('login', this.authService.isAuthenticated);
  }

  authCheck() {
    let login = document.getElementById("loginBTN");
    let logout = document.getElementById("logoutBTN");
    if (this.authService.isAuthenticated) {
      login.style.display = "none"
      logout.style.display = "block"
    }
    else {
      login.style.display = "block"
      logout.style.display = "none"
    }
  }

}
