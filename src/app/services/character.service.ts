import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Character } from '../shared/dataFormat/character';
import { CHARACTERS } from '../shared/characters';


@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor() { }

  getCharacters(): Observable<Character[]> {
    return of(CHARACTERS).pipe(delay(500));
  }

  getCharacter(id: number): Observable<Character> {
    return of(CHARACTERS.filter((character) => (character.id === id))[0]).pipe(delay(500));
  }

  getCharacterIds(): Observable<string[] | any> {
    return of(CHARACTERS.map(character => character.id));
  }
}
