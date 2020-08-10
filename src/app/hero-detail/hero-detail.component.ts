import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CharacterService } from '../services/character.service';
import { Character } from '../shared/dataFormat/character';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  character: Character;
  id: number;
  //characterIds: any[];
  //prev: number;
  //next: number;

  constructor(private characterService: CharacterService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void { 
    this.id = +this.route.snapshot.params['id'];
    this.getTheCharacter(this.id);
    /*
    this.characterService.getCharacterIds()
      .subscribe((characterIds) => this.characterIds= characterIds);
    
    this.route.params
      .pipe(switchMap((params:Params) => this.characterService.getCharacter(+params['id'])))
      .subscribe(character => { this.character = character; this.setPrevNext(character.id); });
    */
  }

  getTheCharacter( id:number ) {
    this.characterService.getCharacter(id)
    .subscribe( character => {
      this.character = character; 
      console.log(this.character);} );  
    
    //this.characterService.getCharacterIds()
    //  .subscribe( characterIds => this.characterIds = characterIds)
    //this.route.params
    //  .pipe(switchMap((params: Params) => {return this.characterService.getCharacter(params['id']);}))
    // .subscribe( character => this.character = character);
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
