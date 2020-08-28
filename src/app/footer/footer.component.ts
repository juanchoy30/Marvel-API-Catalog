import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../services/character.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  info: any;

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
    this.getMarvelInfo();
  }

  getMarvelInfo(): void {
    this.characterService.getCharacters().
      subscribe(info => {
        this.info = info;
      });
  }

}
