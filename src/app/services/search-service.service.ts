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
export class SearchServiceService {

  constructor(private http: HttpClient,
    private processHttpMsgService: ProcessHTTPMsgService) { }

    // For the name searcher
    getCharacterByName (name:string): Observable<any> {
      let characterByName = `${baseURL}?name=${name}&apikey=${publicKey}&ts=${ts}&hash=${hash}`;
      return this.http.get<any>(characterByName)
        .pipe(map((data: any) => data.data.results[0]),
          catchError(this.processHttpMsgService.handleError));
    }

    getCharacterNameStartsWith (text:string):  Observable<any> {
      let characterByName = `${baseURL}?nameStartsWith=${text}&limit=100&apikey=${publicKey}&ts=${ts}&hash=${hash}`;
      return this.http.get<any>(characterByName)
        .pipe(map((data: any) => data.data.results),
          catchError(this.processHttpMsgService.handleError));
    }
}
