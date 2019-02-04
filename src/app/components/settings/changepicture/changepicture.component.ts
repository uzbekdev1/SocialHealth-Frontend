import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WebcamUtil, WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { mimeType } from './mime-type.validator';
import { UserService } from 'src/app/shared/user.service';
import { CroppieOptions } from 'croppie';
import { NgxCroppieComponent } from './ngx-croppie/ngx-croppie.component';



export interface DialogData {
  picUrl: string;
}

@Component({
  selector: 'app-changepicture',
  templateUrl: './changepicture.component.html',
  styleUrls: ['./changepicture.component.css']
})
export class ChangepictureComponent implements OnInit {
  picUrl: string;
  fileUpload = new FormControl('');
  toggleCamera= false;


  ngOnInit() {
  }

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ChangepictureDialog, {
      width: '400px',
      data: { picUrl: this.picUrl}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // this.picUrl = result;
    });
  }

}



@Component({
  selector: 'changepic-dialog',
  templateUrl: 'changepic-dialog.html',
  styleUrls: ['./changepicture.component.css']
})
export class ChangepictureDialog {
  imagePreview;
  form: FormGroup
  constructor(
    public dialogRef: MatDialogRef<ChangepictureDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private userservice:UserService) {
      this.form = new FormGroup(
        {
        'image': new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onImagePicked() {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.croppieImage = reader.result;
    };
    reader.readAsDataURL(file);
  }
  dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);
    // separate out the mime component
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to a typed array
    let ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type:mimeString});
}
  
  onSaveImage(){
    let blobUrl = this.dataURItoBlob(this.editedImage);
    this.form.patchValue({image: blobUrl});
    this.userservice.uploadPicture(this.form.value.image).subscribe(      
      res => {
        console.log(res)
    },
    err => { 
      console.log(err);
      
    });
    // this.form.reset();
  }
  /* croppie */

  @ViewChild('ngxcroppie') ngxCroppie: NgxCroppieComponent;

  widthPx = '250';
  heightPx = '250';
  imageUrl = '';
  currentImage: string;
  croppieImage: string;
  editedImage:string;

  public get imageToDisplay() {
    if (this.currentImage) { return this.currentImage; }
    if (this.imageUrl) { return this.imageUrl; }
    return ``;
  }

  public get croppieOptions(): CroppieOptions {
    const opts: CroppieOptions = {};
    opts.viewport = {
      width: parseInt(this.widthPx, 10),
      height: parseInt(this.heightPx, 10)
    };
    opts.boundary = {
      width: parseInt(this.widthPx, 10),
      height: parseInt(this.heightPx, 10)
    };
    opts.enforceBoundary = true;
    return opts;
  }

  newImageResultFromCroppie(img: string) {
    this.editedImage = img;
  }

  saveImageFromCroppie() {
    this.currentImage = this.editedImage;
  }

  cancelCroppieEdit() {
    this.croppieImage = this.currentImage;
  }

  /* camera */

    // toggle webcam on/off
    public showWebcam = true;
    public allowCameraSwitch = true;
    public multipleWebcamsAvailable = false;
    public deviceId: string;
    public videoOptions: MediaTrackConstraints = {
      //width: {ideal: 1024},
      //height: {ideal: 576}
    };
    public errors: WebcamInitError[] = [];
  
    // latest snapshot
    public webcamImage: WebcamImage = null;
  
    // webcam snapshot trigger
    private trigger: Subject<void> = new Subject<void>();
    // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
    private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();
  
    public ngOnInit(): void {
      WebcamUtil.getAvailableVideoInputs()
        .then((mediaDevices: MediaDeviceInfo[]) => {
          this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
        });
    }
  
    public triggerSnapshot(): void {
      this.trigger.next();
    }
  
    public toggleWebcam(): void {
      this.showWebcam = !this.showWebcam;
    }
  
    public handleInitError(error: WebcamInitError): void {
      this.errors.push(error);
    }
  
    public showNextWebcam(directionOrDeviceId: boolean|string): void {
      // true => move forward through devices
      // false => move backwards through devices
      // string => move to device with given deviceId
      this.nextWebcam.next(directionOrDeviceId);
    }
  
    public handleImage(webcamImage: WebcamImage): void {
      // console.info("received webcam image", webcamImage);
      this.webcamImage = webcamImage;
      this.croppieImage = webcamImage.imageAsDataUrl;
    }
  
    public cameraWasSwitched(deviceId: string): void {
      // console.log("active device: " + deviceId);
      this.deviceId = deviceId;
    }
  
    public get triggerObservable(): Observable<void> {
      return this.trigger.asObservable();
    }
  
    public get nextWebcamObservable(): Observable<boolean|string> {
      return this.nextWebcam.asObservable();
    }
}
