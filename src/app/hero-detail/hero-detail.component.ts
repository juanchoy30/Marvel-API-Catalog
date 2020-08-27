import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { CharacterService } from '../services/character.service';
import { flyInOut, expand  } from '../animations/app.animations';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
  host: {
    '[@flyInOut]':'true',
    'style': 'display:block;'
  },
  animations: [ flyInOut(), expand() ]
})
export class HeroDetailComponent implements OnInit {

  character: any;
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
