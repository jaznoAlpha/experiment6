//Angular
import { Component, ViewChild } from '@angular/core';

//Ionic
import { Nav, Platform, ModalController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Firebase
import firebase from 'firebase';

//Service
import { AuthService } from '../services/auth.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'HomePage';

  pages: Array<{title: string, component: any}>;
  isAuthenticated: boolean = false;
  userInitial;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen, 
              public modal: ModalController,
              public events: Events,
              private authService: AuthService) 
  {
    firebase.initializeApp({
      apiKey: "AIzaSyDXT4KnlMs6WwMIC2JwXAvxtXj4Hqf1YX4",
      authDomain: "dhi-tester-1.firebaseapp.com"
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authService.user = 'auth';
        this.setUserInitial();
        console.log(this.authService.user);
      }
      else {
        this.isAuthenticated = false;
        this.authService.user = 'not';
        this.setUserInitial();
        console.log('Not Authenticated!');
      }
    });
    this.initializeApp();
    events.subscribe('login', (authenticated) => {
      this.isAuthenticated = authenticated;
      this.setUserInitial()
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'HomePage' }, { title: 'Modal', component: 'ModalLoginPage' }, 
    ];

    // sets the initial used in login button
    this.setUserInitial()

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  openLogin() {
    const myModal = this.modal.create('ModalLoginPage');
    myModal.present();
  }

  setUserInitial(){
    this.userInitial = this.authService.user.charAt(0);
  }
}
