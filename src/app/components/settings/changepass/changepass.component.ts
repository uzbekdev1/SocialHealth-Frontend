
import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';


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

  constructor(public dialog: MatDialog, private userService:UserService, private router: Router) {}
  logout (){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ChangepassDialog, {
      width: '300px',
      data: {oldPassword: this.oldPassword, newPassword: this.newPassword}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      this.userService.changePassword(result).subscribe({
        next (x) { 
          console.log(x)
          this.logout();
         },
        error (err) { console.log(err) },
        complete () { console.log("done") }
      });
      // this.newPassword = result;
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