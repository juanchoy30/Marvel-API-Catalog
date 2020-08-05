import { Component, OnInit, Input } from '@angular/core';
import { Character } from '../shared/dataFormat/character';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input()
  character: Character;

  constructor() { }

  ngOnInit(): void {
  }

}
