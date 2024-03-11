import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AutentificacionService {
  private URL_API = 'http://localhost:3000';

  constructor(private _http: HttpClient) { }  

  login(email: string, contrasenia: string): Observable<{ role: string, token: string } | {}> {
    return this._http.get<UserModel[]>(`${this.URL_API}/users`).pipe(
      map(data => {
        // Encuentra el usuario válido
        let validUser = data.find((user: UserModel) => user.email === email && JSON.parse(atob(user.contrasena.split('.')[1])).contrasena === contrasenia);
        
        // Si el usuario es válido, devuelve el rol y el token; de lo contrario, devuelve un objeto vacío
        return validUser ? { role: validUser.rol, token: validUser.contrasena, email:validUser.email  } : {};
      })
    );
  }
}