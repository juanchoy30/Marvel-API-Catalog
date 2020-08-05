import { Injectable } from '@angular/core';
import { Character } from '../shared/dataFormat/character';
import { CHARACTERS } from '../shared/characters';


@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor() { }

  getCharacters(): Character[] {
    return CHARACTERS;
  }
}
