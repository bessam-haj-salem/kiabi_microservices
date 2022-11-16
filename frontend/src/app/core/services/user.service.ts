import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Login } from '../models/Login.model';
import { LoginResponse } from '../models/LoginResponse';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // urlGetUsers: string
  // urlAddUser: string
  // urlDeleteUser:string
  // urlUpdateUser: string
  // urlLoginUser :string
  urlUsers: string
  urlUserLogin: string

  constructor(private http: HttpClient) {
    // this.urlGetUsers = environment.urlGetUsers
    // this.urlAddUser = environment.urlAddUser
    // this.urlDeleteUser = environment.urlDeleteUser
    // this.urlUpdateUser = environment.urlUpdateUser
    // this.urlLoginUser = environment.urlLoginUser
    this.urlUsers = environment.urlUsers
    this.urlUserLogin = environment.urlUserLogin



   }

   getUsers() {
     return this.http.get<User[]>(this.urlUsers)
   }
   addUser(data) {
     return this.http.post<User>(this.urlUsers + 123, data)
   }
   deleteUser(id) {
     return this.http.delete(this.urlUsers + id)
   }
   updateUser(data) {
     return this.http.put<User>(this.urlUsers + data.id, data)
   }
   loginUser(data) {
    return this.http.post<any>(this.urlUserLogin , data)
   }

}
