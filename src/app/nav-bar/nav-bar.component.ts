import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { debounceTime, map, filter, distinctUntilChanged } from 'rxjs/operators';
import { characterSearch } from '../shared/characterSearch';
import { CharacterService } from '../services/character.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @ViewChild( 'SearchInput', {static: true}) searchInput: ElementRef;
  searchField: FormControl;
  searches: string[] = []


  characterSearchForm: FormGroup;
  characterSearch: characterSearch;
  characterCopy: characterSearch;
  characterData: any;
  isSearching: boolean;

  constructor(private fb: FormBuilder,
    private characterService: CharacterService) {
    this.isSearching = false;
   }

  ngOnInit(): void {

    console.log(this.searchInput);
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        map((event: any) => {
          return event.target.value;
        }),
        filter(res => res.length >2),  // filter the api call of the search to more than 2 characters
        debounceTime(1000),            // Delays the api call until the user has stoped typing for at least 1 second
        distinctUntilChanged()   // This operator checks whether the current input is sitting from previously entered value. So that API will not hit if the current and previous value is the same.
      ).subscribe((text:string) => {
        this.isSearching = true;
        this.characterService.getCharacterByName(text)
          .subscribe(characterData => {
            this.isSearching = false;
            this.characterData = characterData;
            console.log(this.characterData);
          })
      })
      ;
  }

}
