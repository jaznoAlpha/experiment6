import { NgModule } from '@angular/core';
import { LoginPictureComponent } from './login-picture';
import { LoginPictureBackgroundComponent } from './login-picture-background/login-picture-background';


@NgModule({
    declarations: [LoginPictureComponent,
                   LoginPictureBackgroundComponent],

    imports:      [],
    
    exports:      [LoginPictureComponent,
                   LoginPictureBackgroundComponent]
})
export class LoginPictureModule {}
