import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, fromEvent, merge } from 'rxjs';
import { debounceTime, filter, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import { SearchServiceService } from '../services/search-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @ViewChild( 'SearchInput', {static: true}) searchInput: ElementRef;
  //@ViewChild('document:mousemove' ) moseMoveWindow: HostListener;
  //searches: string[] = []

  characterData: any;
  queryField: FormControl = new FormControl();
  isSearching: boolean;

  constructor(
    private searchService: SearchServiceService,
    private router:Router) {
    this.isSearching = false;
   }

  ngOnInit(): void {
    console.log(this.searchInput);
    const blurEvent = fromEvent(this.searchInput.nativeElement, 'blur');
    const keyupEvent = fromEvent(this.searchInput.nativeElement, 'keyup');
    const changeEvent = fromEvent(this.searchInput.nativeElement, 'change');
    const clickEvent = fromEvent(this.searchInput.nativeElement, 'click');
    const inputEvent = fromEvent(this.searchInput.nativeElement, 'mousemove');
    const allEvents = merge(blurEvent, keyupEvent, changeEvent, clickEvent, inputEvent)
    allEvents
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
            console.log(this.characterData);
          })
      });
  }

  search = (text$: Observable<string>) =>
      text$.pipe(
        filter(res => res.length >2),  // filter the api call of the search to more than 2 characters
        debounceTime(600),            // Delays the api call until the user has stoped typing for at least 1 second
        distinctUntilChanged(),   // This operator checks whether the current input is sitting from previously entered value. So that API will not hit if the current and previous value is the same.
        switchMap( (text:string) => { 
          this.isSearching = true;
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

  onKey(event ) {
  
  }
  submit(id: any){
    this.router.navigate(['/character', id]) //your router URL need to pass it here
  }

}
