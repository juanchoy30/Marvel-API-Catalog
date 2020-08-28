import { Component, OnInit } from '@angular/core';
import { flyInOut } from '../animations/app.animations';
import { SearchServiceService } from '../services/search-service.service';
import { featuredCharacters } from '../shared/featuredCharacters';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]':'true',
    'style': 'display:block;'
  },
  animations: [flyInOut()]
})
export class HomeComponent implements OnInit {

  character1: any;
  character2: any;
  character3: any;
  character4: any;
  character5: any;
  character6: any;
  errMsg: string;                // This handdles the http error

  constructor(private searchService: SearchServiceService,) { }

  ngOnInit(): void {
    this.getCharacter1();
    this.getCharacter2();
    this.getCharacter3();
    this.getCharacter4();
    this.getCharacter5();
    this.getCharacter6();
  }

  getCharacter1() {
      this.searchService.getCharacterByName('spider-man')
      .subscribe(character => {
        this.character1 = character;
      },
      errmess => {
        this.errMsg = <any>errmess;
      });
    }

    getCharacter2() {
    this.searchService.getCharacterByName('wolverine')
    .subscribe(character => {
      this.character2 = character;
    },
    errmess => {
      this.errMsg = <any>errmess;
    });
  }

  getCharacter3() {
    this.searchService.getCharacterByName('daredevil (ultimate)')
    .subscribe(character => {
      this.character3 = character;
    },
    errmess => {
      this.errMsg = <any>errmess;
    });
  }

  getCharacter4() {
    this.searchService.getCharacterByName('jean grey')
    .subscribe(character => {
      this.character4 = character;
    },
    errmess => {
      this.errMsg = <any>errmess;
    });
  }

  getCharacter5() {
    this.searchService.getCharacterByName('mystique')
    .subscribe(character => {
      this.character5 = character;
    },
    errmess => {
      this.errMsg = <any>errmess;
    });
  }

  getCharacter6() {
    this.searchService.getCharacterByName('gamora')
    .subscribe(character => {
      this.character6 = character;
    },
    errmess => {
      this.errMsg = <any>errmess;
    });
  }
}
