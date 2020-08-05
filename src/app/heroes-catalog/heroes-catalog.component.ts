import { Component, OnInit } from '@angular/core';
import { Character } from '../shared/dataFormat/character';
import { CharacterService } from '../services/character.service';

@Component({
  selector: 'app-heroes-catalog',
  templateUrl: './heroes-catalog.component.html',
  styleUrls: ['./heroes-catalog.component.css']
})
export class HeroesCatalogComponent implements OnInit {

  characters: Character[];
  
  selectedCharacter: Character;

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
    this.characters = this.characterService.getCharacters();
  }

  onSelect(character: Character) {
    this.selectedCharacter = character;
  }

}
