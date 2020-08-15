import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { baseURL } from '../shared/baseUrl';
import { publicKey, ts, hash } from '../shared/validationKeys';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {

  constructor(private http: HttpClient) { }

    // For the name searcher
    getCharacterByName (name:string): Observable<any> {
      let characterByName = `${baseURL}?name=${name}&apikey=${publicKey}&ts=${ts}&hash=${hash}`;
      return this.http.get<any>(characterByName)
        .pipe(map((data: any) => data.data.results[0]))
    }

    getCharacterNameStartsWith (text:string):  Observable<any> {
      let characterByName = `${baseURL}?nameStartsWith=${text}&limit=100&apikey=${publicKey}&ts=${ts}&hash=${hash}`;
      return this.http.get<any>(characterByName)
        .pipe(map((data: any) => data.data.results))
    }
}
