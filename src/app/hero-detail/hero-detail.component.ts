import { Component, OnInit, HostListener } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { CharacterService } from '../services/character.service';
import { ScrollToTopService } from '../services/scroll-to-top.service';
import { flyInOut, expand, visibility   } from '../animations/app.animations';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
  host: {
    '[@flyInOut]':'true',
    'style': 'display:block;'
  },
  animations: [ flyInOut(), expand(), visibility() ]
})
export class HeroDetailComponent implements OnInit {

  character: any;
  id: number | any;
  characterIds : number[]  | any;
  errMsg: string;

  // Animations
  visibility = 'shown';

  constructor(
    private characterService: CharacterService,
    private scrollToTopService: ScrollToTopService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this.scrollToTopService.setScrollTop();
    this.getTheCharacter();
  }

  getTheCharacter() {
    this.route.params.pipe(switchMap((params: Params) => {
      this.visibility = 'hidden';
      return this.characterService.getCharacter(params['id'])}))
        .subscribe( character => {
          this.character = character;
          this.visibility = 'shown';
        },
        errmess => {
          this.errMsg = <any>errmess;
        });
  }

  @HostListener('this.route.params', ['$event'])
  onDataChange(event: any) {
  }

  goBack(): void {
    this.location.back();
  }

}
