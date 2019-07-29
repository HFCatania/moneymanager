import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: User;
  loggedIn: boolean; 
  baseUrl = environment.baseUrl;


  constructor(private http: HttpClient) {
    this.loggedIn = true;
    // this.currentUser = {
    //   id: '17',
    //   firstName: 'John',
    //   lastName: 'Smiff',
    //   userName: 'JSmiff17',
    //   passwordHash: 'SmiffRulez',
    //   email: 'Smiff@sniffz.org'
    // }
  }

  getUser(): User{
    return this.currentUser;
  }

  login(tryUser: User): Observable<User>{
    console.log(this.baseUrl);
    return this.http.post<User>(this.baseUrl + '/api/users/login', tryUser);
  }

  createUser(newUser: User): Observable<User>{
    return this.http.post<User>(this.baseUrl + '/api/users', newUser);
  }

  setUser(user: User){
    this.currentUser = user;
    this.loggedIn = true; 
  }

  clearUser(){
    delete this.currentUser;
    this.loggedIn = false;
  }
}
