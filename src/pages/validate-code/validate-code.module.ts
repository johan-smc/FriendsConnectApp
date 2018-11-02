import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ValidateCodePage } from './validate-code';

@NgModule({
  declarations: [
    ValidateCodePage,
  ],
  imports: [
    IonicPageModule.forChild(ValidateCodePage),
  ],
})
export class ValidateCodePageModule {}
