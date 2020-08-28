import { Component, OnInit, ContentChild, HostListener  } from '@angular/core';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { SearchServiceService } from '../services/search-service.service';
import { flyInOut, expand, visibility } from '../animations/app.animations';
import { changeSizePagination } from '../sizing/app.sizing';

@Component({
  selector: 'app-heroes-catalog',
  templateUrl: './heroes-catalog.component.html',
  styleUrls: ['./heroes-catalog.component.scss'],
  host: {
    '[@flyInOut]':'true',
    'style': 'display:block;'
  },
  animations: [ 
    flyInOut(),
    expand(),
    visibility() ]
})
export class HeroesCatalogComponent implements OnInit {

  // For the pagination:
  // For ngBootstrap pagination use
  @ContentChild(NgbPagination) pagination: NgbPagination;
  page: number = 1;             // Initial page 1=A
  collectionSize = 270;         // Colection of pages, 270 for some reason gives until Z
  size: string = 'md';          // Sizing of the pagination
  maxSize: number = 10;

  // Variable definitions
  characters: any[];
  errMsg: string;

  // Animations
  visibility = 'shown';

  constructor(private searchService: SearchServiceService) { }

  ngOnInit(): void {
    this.getCharactersByLetter(this.page);
    this.changeSize(window.screen.width); 
  }

  // This will change the size of the pagination navbar with the change
  // of the screen size
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.changeSize(event.target.innerWidth);
  }
   

  // This function takes the first leter argument of a name and call all
  // the characters whose name stars with that letter.
  getCharactersByLetter(page: number) {
    this.visibility = 'hidden'
    this.searchService.getCharacterNameStartsWith(this.getPageSymbol(page))
      .subscribe(characters => {
        this.characters = characters;
        this.visibility = 'shown';
      },
      errmess => {
        this.errMsg = <any>errmess;
      });
  }

  // This funciton transform the pagination number into leters of the alphabet
  getPageSymbol(current: number) {
    return ['A', 'B', 'C', 'D', 'E', 'F', 'G',
            'H', 'I', 'J', 'K', 'L', 'M', 'N',
            'O', 'P', 'Q', 'R', 'S', 'T', 'U',
            'V', 'W', 'X', 'Y', 'Z', '3'][current - 1];
  }

  // This function changes the size of the pagination navbar
  changeSize(arg: any) {
    this.size = changeSizePagination(arg)[0];
    this.maxSize = changeSizePagination(arg)[1];
  }

}
