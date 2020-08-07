import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Character } from '../shared/dataFormat/character';
import { CharacterService } from '../services/character.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  character: Character;
  characterIds: number[];
  prev: number;
  next: number;

  constructor(private characterService: CharacterService,
    private route: ActivatedRoute,
    private location: Location) { }
  allCharacters: Observable<any>;

  ngOnInit(): void { 
    this.characterService.getCharacterIds()
      .subscribe((characterIds) => this.characterIds= characterIds);
    this.route.params
      .pipe(switchMap((params:Params) => this.characterService.getCharacter(+params['id'])))
      .subscribe(character => { this.character = character; this.setPrevNext(character.id); });
  }

  getAllCharacters() {
    this.allCharacters = this.characterService.getCharacters();
  }

  setPrevNext(characterIds: number) {
    const index = this.characterIds.indexOf(characterIds);
    this.prev = this.characterIds[(this.characterIds.length + index - 1) % this.characterIds.length];
    this.next = this.characterIds[(this.characterIds.length + index + 1) % this.characterIds.length];

  }

  goBack(): void {
    this.location.back();
  }

}
