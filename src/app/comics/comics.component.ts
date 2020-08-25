import { Component, OnInit, ViewEncapsulation, HostListener, Input} from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { switchMap } from 'rxjs/operators';

import { IssuesService } from '../services/issues.service';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./comics.component.scss']
})
export class ComicsComponent implements OnInit {

  comics: any;
  events: any;
  series: any;
  resultsComics: any;         // Comics result counter (Number of comics)
  resultsEvents: any;         // Event result counter (Number of events)
  resultsSeries: any;         // Series result counter (Number of Series)
  id: number | any;
  closeResult: string;
  selectedComic: any;
  newDate: string;
  errMsg: string;
  class: string;                 // Style of carousel
  hiddenClass: string;                 // Style of carousel
  @Input() shownNumber: number;  // To size the carousel
  @Input() forNumber: number;    // To size the carousel
  @Input() shownNumberE: number; // To size the carousel
  @Input() forNumberE: number;   // To size the carousel
  @Input() shownNumberS: number; // To size the carousel
  @Input() forNumberS: number;   // To size the carousel


  constructor(
    private issuesService: IssuesService,
    private route: ActivatedRoute,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getComics();
    this.getEvents();
    this.getSeries();
  }
  

  getComics() {
    this.route.params.pipe(switchMap((params: Params) => {
      return this.issuesService.getComicCharacter(params['id'])}))
        .subscribe( comics => {
          this.comics = comics;
          this.resultsComics = this.comics.count;
          if ( this.resultsComics <= 1) { //This if avoids the changeSize function if the number of issues is less or equal to 1
            console.log(this.resultsComics);
          } else {
            this.changeSizeComics(window.screen.width, this.resultsComics); // This function sizes the carousel
          }
        },
        errmess => {
          this.errMsg = <any>errmess;
        });
  }

  getEvents() {
    this.route.params.pipe(switchMap((params: Params) => {
      return this.issuesService.getEventsCharacter(params['id'])}))
        .subscribe( events => {
          this.events = events;
          this.resultsEvents = this.events.count;
          if ( this.resultsEvents <= 1) { //This if avoids the changeSize function if the number of issues is less or equal to 1
            console.log(this.resultsEvents);
          } else {
            this.changeSizeEvents(window.screen.width, this.resultsEvents); // This function sizes the carousel
          }
        },
        errmess => {
          this.errMsg = <any>errmess;
        });
  }

  getSeries() {
    this.route.params.pipe(switchMap((params: Params) => {
      return this.issuesService.getSeriesCharacter(params['id'])}))
        .subscribe( series => {
          this.series = series;
          this.resultsSeries = this.series.count;
          if ( this.resultsSeries <= 1) { //This if avoids the changeSize function if the number of issues is less or equal to 1
            console.log(this.resultsSeries);
          } else {
            this.changeSizeSeries(window.screen.width, this.resultsSeries); // This function sizes the carousel
          }
        },
        errmess => {
          this.errMsg = <any>errmess;
        });
  }

  

  openScrollableContent(longContent) {
    this.modalService.open(longContent, { scrollable: true });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.changeSizeComics(event.target.innerWidth, this.comics.count);
    this.changeSizeEvents(event.target.innerWidth, this.events.count);
  }

  // changing size for comics
  changeSizeComics(arg: any, counter: number) {
    if (arg <= 375) {   //Screen Size
      this.class = 'card-container d-flex justify-content-around col-12';
      this.shownNumber = 1;
      this.forNumber = 0;

    } else if (arg <= 425) {   //Screen Size
      this.class = 'card-container d-flex justify-content-around col-12';
      this.shownNumber = 1;
      this.forNumber = 0;

    } else if (arg <= 768) {  //Screen Size
      // Segregation of kind of issue result and the number of them
      if (counter === 2) {
        this.class = 'card-container d-flex justify-content-around col-6';
        this.shownNumber = counter;
        this.forNumber = counter-1;
      } else if (counter === 3) {
        this.class = 'card-container d-flex justify-content-around col-6';
        this.shownNumber = counter-1;
        this.forNumber = counter-2;
      } else {
        this.shownNumber = 2;
        this.forNumber = 1;
      }

    } else if (arg <= 1024) {  //Screen Size
      if (counter === 2) {
        this.class = 'card-container d-flex justify-content-around col-6';
        this.shownNumber = counter
        this.forNumber = counter-1;
      } else if ((counter === 3)) {
        this.class = 'card-container d-flex justify-content-around col-4';
        this.shownNumber = counter
        this.forNumber = counter-1;
      } else {
        this.class = 'card-container d-flex justify-content-around col-4';
        this.shownNumber = 3;
        this.forNumber = 2;
      }

    } else if (arg <= 1440 || arg > 1400) {
      if (counter === 2) {
        this.class = 'card-container d-flex justify-content-around col-6';
        this.shownNumber = counter
        this.forNumber = counter-1;
      } else if ((counter === 3)) {
        this.class = 'card-container d-flex justify-content-around col-4';
        this.shownNumber = counter;
        this.forNumber = counter-1;
      } else {
        this.class = 'card-container d-flex justify-content-around col-3';
        this.shownNumber = 4;
        this.forNumber = 3;
      }
    }
  }

  // changing size for events
  changeSizeEvents(arg: any, counter: number) {
    if (arg <= 375) {    //Screen Size
      this.class = 'card-container d-flex justify-content-around col-12';
      this.shownNumberE = 1;
      this.forNumberE = 0;

    } else if (arg <= 425) {    //Screen Size
      this.class = 'card-container d-flex justify-content-around col-12';
      this.shownNumberE = 1;
      this.forNumberE = 0;
    } else if (arg <= 768) {   //Screen Size
      // Segregation of kind of issue result and the number of them
      if (counter === 2) {
        this.class = 'card-container d-flex justify-content-around col-6';
        this.shownNumberE = counter;
        this.forNumberE = counter-1;
      } else if (counter === 3) {
        this.class = 'card-container d-flex justify-content-around col-6';
        this.shownNumberE = counter-1;
        this.forNumberE = counter-2;
      } else {
        this.shownNumberE = 2;
        this.forNumberE = 1;
      } 
    } else if (arg <= 768) {  //Screen Size
      // Segregation of kind of issue result and the number of them
      if (counter === 2) {
        this.class = 'card-container d-flex justify-content-around col-6';
        this.shownNumberE = counter;
        this.forNumberE = counter-1;
      } else if (counter === 3) {
        this.class = 'card-container d-flex justify-content-around col-6';
        this.shownNumberE = counter-1;
        this.forNumberE = counter-2;
      } else {
        this.shownNumberE = 2;
        this.forNumberE = 1;
      }

    } else if (arg <= 1024) {  //Screen Size
      if (counter === 2) {
        this.class = 'card-container d-flex justify-content-around col-6';
        this.shownNumberE = counter;
        this.forNumberE = counter-1;
      } else if (counter === 3) {
        this.class = 'card-container d-flex justify-content-around col-4';
        this.shownNumberE = counter
        this.forNumberE = counter-1;
      }else { 
        this.class = 'card-container d-flex justify-content-around col-4';
        this.shownNumberE = 3;
        this.forNumberE = 2;
      }
    } else if (arg <= 1440 || arg > 1400) {
      if (counter === 2) {
        this.class = 'card-container d-flex justify-content-around col-6';
        this.shownNumberE = counter;
        this.forNumberE = counter-1;
      } else if (counter === 3) {
        this.class = 'card-container d-flex justify-content-around col-4';
        this.shownNumberE = counter
        this.forNumberE = counter-1;
      } else {
        this.class = 'card-container d-flex justify-content-around col-3';
        this.shownNumberE = 4;
        this.forNumberE = 3;
      }
    }
  }

  // changing size for series
  changeSizeSeries(arg: any, counter: number) {
    if (arg <= 375) {    //Screen Size
      this.class = 'card-container d-flex justify-content-around col-12';
      this.shownNumberS = 1;
      this.forNumberS = 0;

    } else if (arg <= 425) {    //Screen Size
      this.class = 'card-container d-flex justify-content-around col-12';
      this.shownNumberS = 1;
      this.forNumberS = 0;
    } else if (arg <= 768) {   //Screen Size
      // Segregation of kind of issue result and the number of them
      if (counter === 2) {
        this.class = 'card-container d-flex justify-content-around col-6';
        this.shownNumberS = counter;
        this.forNumberS = counter-1;
      } else if (counter === 3) {
        this.class = 'card-container d-flex justify-content-around col-6';
        this.shownNumberS = counter-1;
        this.forNumberS = counter-2;
      } else {
        this.shownNumberS = 2;
        this.forNumberS = 1;
      } 
    } else if (arg <= 768) {  //Screen Size
      // Segregation of kind of issue result and the number of them
      if (counter === 2) {
        this.class = 'card-container d-flex justify-content-around col-6';
        this.shownNumberS = counter;
        this.forNumberS = counter-1;
      } else if (counter === 3) {
        this.class = 'card-container d-flex justify-content-around col-6';
        this.shownNumberS = counter-1;
        this.forNumberS = counter-2;
      } else {
        this.shownNumberS = 2;
        this.forNumberS = 1;
      }

    } else if (arg <= 1024) {  //Screen Size
      if (counter === 2) {
        this.class = 'card-container d-flex justify-content-around col-6';
        this.shownNumberS = counter;
        this.forNumberS = counter-1;
      } else if (counter === 3) {
        this.class = 'card-container d-flex justify-content-around col-4';
        this.shownNumberS = counter
        this.forNumberS = counter-1;
      }else { 
        this.class = 'card-container d-flex justify-content-around col-4';
        this.shownNumberS = 3;
        this.forNumberS = 2;
      }
    } else if (arg <= 1440 || arg > 1400) {
      if (counter === 2) {
        this.class = 'card-container d-flex justify-content-around col-6';
        this.shownNumberS = counter;
        this.forNumberS = counter-1;
      } else if (counter === 3) {
        this.class = 'card-container d-flex justify-content-around col-4';
        this.shownNumberS = counter
        this.forNumberS = counter-1;
      } else {
        this.class = 'card-container d-flex justify-content-around col-3';
        this.shownNumberS = 4;
        this.forNumberS = 3;
      }
    }
  }



}
