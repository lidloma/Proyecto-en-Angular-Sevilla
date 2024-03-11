import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OpinionModel } from '../models/opinion.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpinionService {

  private URL_API = 'http://localhost:3000/opiniones';

  constructor(private http: HttpClient) { }

  getOpiniones(): Observable<OpinionModel[]> {
    return this.http.get<OpinionModel[]>(this.URL_API);
  }

  addOpiniones(opinion: OpinionModel): Observable<OpinionModel> {
    return this.http.post<OpinionModel>(this.URL_API, opinion);
  }
}

