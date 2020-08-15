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
  errMsg: string;

  constructor(private characterService: CharacterService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this.getTheCharacter();
  }

  getTheCharacter() {
    this.route.params.pipe(switchMap((params: Params) => {
      return this.characterService.getCharacter(params['id'])}))
        .subscribe( character => {
          this.character = character;
          console.log(character);
        },
        errmess => {
          this.errMsg = <any>errmess;
        });
  }

  goBack(): void {
    this.location.back();
  }

}
