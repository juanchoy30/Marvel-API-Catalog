import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, map, filter, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { SearchServiceService } from '../services/search-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @ViewChild( 'SearchInput', {static: true}) searchInput: ElementRef;
  searches: string[] = []

  characterData: any;
  queryField: FormControl = new FormControl();
  isSearching: boolean;

  constructor(
    private searchService: SearchServiceService) {
    this.isSearching = false;
   }

  ngOnInit(): void {

  }

  search = (text$: Observable<string>) =>
      text$.pipe(
        filter(res => res.length >2),  // filter the api call of the search to more than 2 characters
        debounceTime(1000),            // Delays the api call until the user has stoped typing for at least 1 second
        distinctUntilChanged(),   // This operator checks whether the current input is sitting from previously entered value. So that API will not hit if the current and previous value is the same.
        switchMap( (text:string) => { 
          this.isSearching = true;
          // I have to make this a selectable of the options
          this.searchService.getCharacterByName(text)
          .subscribe(characterData => {
            this.isSearching = false;
            this.characterData = characterData;
            console.log(this.characterData);
          })
          //
          return this.searchService.getCharacterNameStartsWith(text);
        }));

      /*
      this.queryField.valueChanges
    .pipe(
      filter(res => res.length >2),  // filter the api call of the search to more than 2 characters
      debounceTime(1000),            // Delays the api call until the user has stoped typing for at least 1 second
      distinctUntilChanged()   // This operator checks whether the current input is sitting from previously entered value. So that API will not hit if the current and previous value is the same.
    ).subscribe((text:string) => {
      this.isSearching = true;
      this.searchService.getCharacterByName(text)
        .subscribe(characterData => {
          this.isSearching = false;
          this.characterData = characterData;
          console.log(this.characterData);
        })
    });*/
      
  

      resultFormatBandListValue(value: any) {            
        return value.name;
      }

      inputFormatBandListValue(value: any)   {
        if(value.name)
          return value.name
        return value;
      }

}
