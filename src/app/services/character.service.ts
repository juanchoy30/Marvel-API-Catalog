import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { baseURL } from '../shared/baseUrl';
import { publicKey, ts, hash } from '../shared/validationKeys';
import { Character } from '../shared/dataFormat/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  charactersURL = `${baseURL}?apikey=${publicKey}&ts=${ts}&hash=${hash}`;
  /* Public key and HASH are personal, per Marvel Account. If you want to
     run this particular project on your own, you should sing up to Marvel
     https://developer.marvel.com/ and get your keys.
  */

  constructor(private http: HttpClient) { }

  getCharacters(): Observable<Character[] | any> {
    return this.http.get<Character[] | any>(this.charactersURL)
      .pipe(map((data: Character | any) => data.data.results));
  }

  getCharacter(id: number): Observable<Character | any> {
    let charactersIdURL = `${baseURL}/${id}?apikey=${publicKey}&ts=${ts}&hash=${hash}`;
    return this.http.get<Character | any>(charactersIdURL)
      .pipe(map((data: Character | any) => data.data.results[0]));
  }

  getComicCharacter(id: number): Observable<any> {
    let comicsURL = `${baseURL}/${id}/comics?apikey=${publicKey}&ts=${ts}&hash=${hash}`;
    return this.http.get<any>(comicsURL)
      .pipe(map((data: Character | any) => data.data.results));
  }

  getCharacterIds():  Observable<number[] | any> {
    return this.getCharacters().pipe(map((character) => character.map(character => character.id)));
  }
}
