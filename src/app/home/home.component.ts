import { Component, OnInit } from '@angular/core';
import { flyInOut } from '../animations/app.animations';
import { SearchServiceService } from '../services/search-service.service';
import { ScrollToTopService } from '../services/scroll-to-top.service';
import { featuredCharacters } from '../shared/featuredCharacters';
import { create } from 'domain';


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
  randomSelection: any[];


  constructor(
    private searchService: SearchServiceService,
    private scrollToTopService: ScrollToTopService) { }

  ngOnInit(): void {
    this.scrollToTopService.setScrollTop();
    this.definingCharacters()
    console.log(this.randomSelection)
    this.getCharacter1();
    this.getCharacter2();
    this.getCharacter3();
    this.getCharacter4();
  }

  getCharacter1() {
      this.searchService.getCharacterByName(featuredCharacters[this.randomSelection[0]])
      .subscribe(character => {
        this.character1 = character;
      },
      errmess => {
        this.errMsg = <any>errmess;
      });
    }

    getCharacter2() {
    this.searchService.getCharacterByName(featuredCharacters[this.randomSelection[1]])
    .subscribe(character => {
      this.character2 = character;
    },
    errmess => {
      this.errMsg = <any>errmess;
    });
  }

  getCharacter3() {
    this.searchService.getCharacterByName(featuredCharacters[this.randomSelection[2]])
    .subscribe(character => {
      this.character3 = character;
    },
    errmess => {
      this.errMsg = <any>errmess;
    });
  }

  getCharacter4() {
    this.searchService.getCharacterByName(featuredCharacters[this.randomSelection[3]])
    .subscribe(character => {
      this.character4 = character;
    },
    errmess => {
      this.errMsg = <any>errmess;
    });
  }


  definingCharacters() {
    //https://calebdeji.hashnode.dev/generating-an-array-of-random-numbers-without-repetition-js-cjyikknkw001lxms13f213fh8
    this.randomSelection = [];
    let randomNumber = Math.floor( Math.random() * featuredCharacters.length );
    this.randomSelection.push(randomNumber);
    for (let i = 0; i<3; i++) {
      let newRandomNumber = Math.floor( Math.random() * featuredCharacters.length );
      while ( this.randomSelection.lastIndexOf(newRandomNumber) !== -1) {
        newRandomNumber = Math.floor( Math.random() * featuredCharacters.length );
      }
      this.randomSelection.push(newRandomNumber);
      //randomSelection[i] = featuredCharacters[randomSelectionNumber];
    }
    return this.randomSelection;
  }
}
