import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';

export interface Res {
  status: number;
  users: Object;
}

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  users;
  constructor(private userservice: UserService) {
    this.getProfessional();
   }
   getProfessional(){
     this.userservice.getExploreDoctor().subscribe((res:Res)=>{
      this.users=res.users;
    });
   }

  ngOnInit() {
  }

}
