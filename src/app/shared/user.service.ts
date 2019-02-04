import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    fullName: '',
    email: '',
    password: '',
    picturePath: '',
    userType: '',
    username: ''
  };
  _id;
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  // HttpMethods

  postUser(user: User) {
    return this.http.post(environment.apiBaseUrl + '/register', user, this.noAuthHeader);
  }

  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials, this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }
  changePassword(data){
    data._id=this._id;
    return this.http.post(environment.apiBaseUrl + '/changePassword',data);
  }
  uploadPicture(image){
    console.log(image)
    let postData;
    if (typeof(image) === 'object') {
      postData = new FormData();
      postData.append('_id', this._id); 
      postData.append('image', image, "profile"); // title sets the filename
    } else {
        postData = {
        _id: this._id,
        imagePath: image
      };
    }
    return this.http.post(environment.apiBaseUrl + '/uploadPicture',postData);
  }

  getExploreDoctor(){
    return this.http.get(environment.apiBaseUrl + '/explore');
  }

  // Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    // tslint:disable-next-line:prefer-const
    let token = this.getToken();
    if (token) {
      // tslint:disable-next-line:prefer-const
      let userPayload = atob(token.split('.')[1]);
      // console.log( JSON.parse(userPayload));
      this._id=JSON.parse(userPayload)._id;
      return JSON.parse(userPayload);
    } else {
      return null;
    }
  }

  isLoggedIn() {
    // tslint:disable-next-line:prefer-const
    let userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }
}
