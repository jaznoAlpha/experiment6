//Angular
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

//Ionic
import { IonicPage, NavController, NavParams, Events} from 'ionic-angular';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

//Services
import { AuthService } from '../../services/auth.service';




@IonicPage()
@Component({
  selector: 'page-modal-login',
  templateUrl: 'modal-login.html',
})
export class ModalLoginPage {
  
  userName: string = 'Guest';
  state: string = 'login';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public events: Events,
              private authService: AuthService,
              private loadingCtrl: LoadingController,
              private viewCtrl: ViewController,
              private alertCtrl: AlertController) {
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
        this.viewCtrl.dismiss();
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
    this.viewCtrl.dismiss();
  }

  authCheck() {
    let login = document.getElementById("loginBTN");
    let logout = document.getElementById("logoutBTN");
    if (this.authService.isAuthenticated) {
      login.style.display = "none"
      logout.style.display = "block"
      this.state = "logout"
    }
    else {
      login.style.display = "block"
      logout.style.display = "none"
      this.state = "login"
    }
  }

  onClose() {
    this.viewCtrl.dismiss();
  }

}
