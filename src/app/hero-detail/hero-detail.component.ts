import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { CharacterService } from '../services/character.service';
import { Character } from '../shared/dataFormat/character';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  character: Character | any;
  id: number | any;
  characterIds : number[]  | any;
  //prev: number;
  //next: number;3

  constructor(private characterService: CharacterService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this.getTheCharacter();
  }

  getTheCharacter() {
    /*
    this.characterService.getCharacterIds()
      .subscribe(characterIds => this.characterIds = characterIds );
      */
    this.route.params.pipe(switchMap((params: Params) => {
      return this.characterService.getCharacter(params['id'])}))
        .subscribe( character => {
          this.character = character;
        });
  }

  //setPrevNext(characterIds: number) {
  //  const index = this.characterIds.indexOf(characterIds);
  //  this.prev = this.characterIds[(this.characterIds.length + index - 1) % this.characterIds.length];
  //  this.next = this.characterIds[(this.characterIds.length + index + 1) % this.characterIds.length];

  //}

  //goBack(): void {
  //  this.location.back();
  //}

}
