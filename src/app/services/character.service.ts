import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Character } from '../shared/dataFormat/character';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseUrl';


@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  URL_API = baseURL;

  constructor(private http: HttpClient) { }

  getCharacters(): Observable<any> {
    return this.http.get<any>(this.URL_API)
    .pipe(map((data: any) => data.data.results));
  }

  getCharacter(id: number): Observable<Character> {
    return this.http.get<Character>(this.URL_API + 'character/' + id);
  }

  getCharacterIds(): Observable<string[] | any> {
    return this.getCharacters().pipe(map(characters => characters.map(character => character.id)));
  }
}
