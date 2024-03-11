import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LugarModel } from '../models/lugar.model';

@Injectable({
  providedIn: 'root'
})
export class SitiosService {
  private URL_API = 'http://localhost:3000/lugar';
  private dbUrl = 'assets/db.json'; // Ruta del archivo db.json

  
  constructor(private _http: HttpClient) { }

  getLugarList(): Observable<LugarModel[]> {
    return this._http.get<LugarModel[]>(this.URL_API);
  }

  editLugar(id:number, lugar:LugarModel):Observable<LugarModel>{
    return this._http.put<LugarModel>(`${this.URL_API}/${id}`, lugar);
  }

  anadirLugar(data:LugarModel): Observable<LugarModel>{
    return this._http.post<LugarModel>(`${this.URL_API}`, data);
  }

  borrarLugar(id:number): Observable<LugarModel>{
    return this._http.delete<LugarModel>(`${this.URL_API}/${id}`);
  }
  actualizarPuntuacion(id: number, puntuacion: number): Observable<LugarModel> {
    return this._http.patch<LugarModel>(`${this.URL_API}/${id}`, { puntuacion });
  }


  
}
