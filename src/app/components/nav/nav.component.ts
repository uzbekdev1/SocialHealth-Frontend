import { Component, OnDestroy, ChangeDetectorRef, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
export interface User {
  fullName: string;
  email: string;
  profilePath:string;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  userDetails:User;
  name:string;
  picturePath:string;

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.name=this.userDetails.fullName;
        this.picturePath= this.userDetails.profilePath;
      },
      err => { 
        console.log(err);
        
      }
    );
  }
  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private userService: UserService, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
