import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../services/character.service';
import { Character } from '../shared/dataFormat/character';

@Component({
  selector: 'app-heroes-catalog',
  templateUrl: './heroes-catalog.component.html',
  styleUrls: ['./heroes-catalog.component.css']
})
export class HeroesCatalogComponent implements OnInit {

  characters: Character[];

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
    this.getAllCharacters();
  }

  getAllCharacters() {
    this.characterService.getCharacters()
      .subscribe( characters => {
        this.characters = characters;
        console.log(characters)
    } );
  }
}
