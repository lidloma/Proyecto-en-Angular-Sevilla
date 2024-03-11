import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL_API = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  getUsersList(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.URL_API);
  }

  addUser(user: UserModel): Observable<UserModel> {
    console.log('Usuario a agregar:', user);
    return this.http.post<UserModel>(this.URL_API, user);
  }
}
