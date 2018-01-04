import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalLoginPage } from './modal-login';
import { LoginPictureModule } from '../../components/login-picture/login-picture.module';
import { LoginPictureBackgroundComponent } from '../../components/login-picture/login-picture-background/login-picture-background';

@NgModule({
  declarations: [
    ModalLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalLoginPage),
    LoginPictureModule
  ],
})
export class ModalLoginPageModule {}
