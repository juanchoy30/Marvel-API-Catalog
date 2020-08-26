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
export class CharacterService {

  charactersURL = `${baseURL}?limit=1&apikey=${publicKey}&ts=${ts}&hash=${hash}`;
  /* Public key and HASH are personal, per Marvel Account. If you want to
     run this particular project on your own, you should sing up to Marvel
     https://developer.marvel.com/ and get your keys.
  */

  constructor(
    private http: HttpClient,
    private processHttpMsgService: ProcessHTTPMsgService
    ) { }
// Not in use at the moment
  getCharacters(): Observable<any> {
    return this.http.get<any>(this.charactersURL)
      .pipe(map((data:any) => data),
        catchError(this.processHttpMsgService.handleError));
  }

  getCharacter(id: number): Observable<any> {
    let charactersIdURL = `${baseURL}/${id}?apikey=${publicKey}&ts=${ts}&hash=${hash}`;
    return this.http.get<any>(charactersIdURL)
      .pipe(map((data:any) => data.data.results[0]),
        catchError(this.processHttpMsgService.handleError));
  }
}
