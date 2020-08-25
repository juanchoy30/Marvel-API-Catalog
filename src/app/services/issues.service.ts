import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { baseURL } from '../shared/baseUrl';
import { publicKey, ts, hash } from '../shared/validationKeys';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  constructor(
    private http: HttpClient,
    private processHttpMsgService: ProcessHTTPMsgService) { }


  getComicCharacter(id: number): Observable<any> {
    let comicsURL = `${baseURL}/${id}/comics?limit=30&apikey=${publicKey}&ts=${ts}&hash=${hash}`;
    return this.http.get<any>(comicsURL)
      .pipe(map((data:any) => data.data),
        catchError(this.processHttpMsgService.handleError));
  }
  // The data is not being formated so the number of items of the JSON file is available
  
  getEventsCharacter(id: number): Observable<any> {
    let comicsURL = `${baseURL}/${id}/events?limit=30&apikey=${publicKey}&ts=${ts}&hash=${hash}`;
    return this.http.get<any>(comicsURL)
      .pipe(map((data:any) => data.data),
        catchError(this.processHttpMsgService.handleError));
  }
}
