import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangepassComponent, ChangepassDialog } from './changepass/changepass.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialComponentsModule } from 'src/app/shared/material-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsComponent } from './settings.component';
import { ChangepictureComponent, ChangepictureDialog } from './changepicture/changepicture.component';
import { NgxCroppieModule } from './changepicture/ngx-croppie/ngx-croppie.module';
import { WebcamModule } from 'ngx-webcam';


@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCroppieModule,
    WebcamModule
  ],
  declarations: [
    SettingsComponent,
    ChangepassComponent,
    ChangepassDialog,
    ChangepictureComponent,
    ChangepictureDialog
  ],
  entryComponents: [
    ChangepassDialog, ChangepictureDialog
  ],
})
export class SettingsModule { }
