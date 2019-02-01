
import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  oldPassword: string;
  newPassword: string;
}

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent {
  oldPassword: string;
  newPassword: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ChangepassDialog, {
      width: '300px',
      data: {oldPassword: this.oldPassword, newPassword: this.newPassword}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.newPassword = result;
    });
  }


}

@Component({
  selector: 'changepass-dialog',
  templateUrl: 'changepass-dialog.html',
})
export class ChangepassDialog {

  constructor(
    public dialogRef: MatDialogRef<ChangepassDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}