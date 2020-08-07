import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CharacterService } from '../services/character.service';

@Component({
  selector: 'app-heroes-catalog',
  templateUrl: './heroes-catalog.component.html',
  styleUrls: ['./heroes-catalog.component.css']
})
export class HeroesCatalogComponent implements OnInit {

  characters: Observable <any>;

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
    this.getAllCharacters();
  }

  getAllCharacters() {
    this.characters = this.characterService.getCharacters();
  }
}
