import { Component, OnInit, ContentChild, HostListener  } from '@angular/core';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { SearchServiceService } from '../services/search-service.service';

@Component({
  selector: 'app-heroes-catalog',
  templateUrl: './heroes-catalog.component.html',
  styleUrls: ['./heroes-catalog.component.scss']
})
export class HeroesCatalogComponent implements OnInit {

  // For the pagination:
  // For ngBootstrap pagination use
  @ContentChild(NgbPagination) pagination: NgbPagination;
  // Initial page 1=A
  page: number = 1;
  // Colection of pages, 270 for some reason gives until Z
  collectionSize = 270;

  // Sizing of the pagination
  size: string = 'md';
  maxSize: number = 10;

  // Variable definitions
  characters: any[];
  errMsg: string;

  constructor(
    private searchService: SearchServiceService) { }

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
    this.searchService.getCharacterNameStartsWith(this.getPageSymbol(page))
      .subscribe(characters => {
        this.characters = characters;
        console.log(this.characters);
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
    if (arg <= 375) { 
      this.size = 'sm';
      this.maxSize = 5;
    } else if (arg <= 425) {
      this.size = 'md';
      this.maxSize = 5;
    } else if (arg <= 768) {
      this.size = 'md';
      this.maxSize = 10;
    } else if (arg <= 1024) {
      this.size = 'md';
      this.maxSize = 15;
    } else if (arg <= 1440) {
      this.size = 'md';
      this.maxSize = 20;
    }
  }

}
