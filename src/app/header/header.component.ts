import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { CharacterService } from '../services/character.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  characters: any[];

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
  }

  getNamedCharacters(input) {
    //this.characterService.getCharacterByName()
    //  .subscribe( characters => {
    //    this.characters = characters;
    //} );
  }

}
