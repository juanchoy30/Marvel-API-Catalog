import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, fromEvent} from 'rxjs';
import { debounceTime, filter, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import { SearchServiceService } from '../services/search-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @ViewChild( 'SearchInput', {static: true}) searchInput: ElementRef;

  characterData: any;            // Character data definition
  queryField: FormControl = new FormControl();
  isSearching: boolean;          // Filters the trigger of the GET call
  clickedItem:string;            // Defined to handle clickable input sugestions
  errMsg: string;                // This handdles the http error
  public isMenuCollapsed = true; // This is made to make the navbar collapasable

  constructor(
    private searchService: SearchServiceService,
    private router:Router) {
    this.isSearching = false;
   }

  ngOnInit(): void {

    // This method gets the call GET if user type heroes name
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        map((event: any) => {
          return event.target.value;
        }),
        filter(res => res.length >2),  // filter the api call of the search to more than 2 characters
        debounceTime(700),            // Delays the api call until the user has stoped typing for at least 1 second
        distinctUntilChanged()   // This operator checks whether the current input is sitting from previously entered value. So that API will not hit if the current and previous value is the same.
      ).subscribe((text:string) => {
        this.isSearching = true;
        this.searchService.getCharacterByName(text)
          .subscribe(characterData => {
            this.isSearching = false;
            this.characterData = characterData;
          },
          errmess => {
            this.errMsg = <any>errmess;
            console.log(this.characterData);
          })
      });
  }

  // This method gets the names of suggested characters to show them on the
  // search input
  search = (text$: Observable<string>) =>
      text$.pipe(
        filter(res => res.length >2),  // filter the api call of the search to more than 2 characters
        debounceTime(600),            // Delays the api call until the user has stoped typing for at least 1 second
        distinctUntilChanged(),   // This operator checks whether the current input is sitting from previously entered value. So that API will not hit if the current and previous value is the same.
        switchMap( (text:string) => { 
          this.isSearching = true;
          return this.searchService.getCharacterNameStartsWith(text);
        }));
      
  // This two methods allow the names sugestions appear in the input

  resultFormatBandListValue(value: any) {            
    return value.name;
  }

  inputFormatBandListValue(value: any)   {
    if(value.name)
      return value.name;
      return value;
  }

  // This method will allow the selected hero within the search imput to call
  // The get method on the searchservice
  selectedItem(item: any){
    this.clickedItem = item.item.name;
    this.searchService.getCharacterByName(this.clickedItem)
    .subscribe(characterData => {
      this.characterData = characterData;
      this.submit(characterData.id);
    });

  }

  // This submition method will allow the search button to appear with the
  // correspondent url
  submit(id: any){
    this.router.navigateByUrl('/', { skipLocationChange:true })
      .then(()=> {
        this.router.navigate(['/character', id]);
      }); //your router URL need to pass it here (https://stackoverflow.com/questions/47813927/how-to-refresh-a-component-in-angular)
    this.queryField.reset();
  }

}
