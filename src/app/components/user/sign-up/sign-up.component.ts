import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface Types {
  value: string;
  viewValue: string;
}

import { UserService } from '../../../shared/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  // tslint:disable-next-line:max-line-length
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean;
  serverErrorMessages: string;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  types: Types[] = [
    {value: 'pro', viewValue: 'Doctor'},
    {value: 'pac', viewValue: 'Paciente'}
  ];

  constructor(private userService: UserService, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      fullName: ['', Validators.required],
      username: ['', Validators.required],
      userType: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit(form1: FormGroup, form2: FormGroup) {
    this.userService.postUser({...form1.value, ...form2.value}).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form1);
        this.resetForm(form2);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        } else {
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
        }
      }
    );
  }

  resetForm(form: FormGroup) {
    this.userService.selectedUser = {
      fullName: '',
      email: '',
      password: '',
      picturePath: '',
      userType: '',
      username: ''
    };
    form.reset();
    this.serverErrorMessages = '';
  }

}
