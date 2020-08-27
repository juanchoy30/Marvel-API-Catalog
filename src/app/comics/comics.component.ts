import { Component, OnInit, ViewEncapsulation, HostListener, Input} from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { switchMap } from 'rxjs/operators';
import { expand } from '../animations/app.animations';
import { changeSizeCarousel } from '../sizing/app.sizing';


import { IssuesService } from '../services/issues.service';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./comics.component.scss'],
  animations: [ expand()]
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

  Comicsclass: string;                 // Style of carousel
  Eventsclass: string;                 // Style of carousel
  Seriescslass: string;                 // Style of carousel
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
    const width= window.screen.availWidth;
    console.log(width);
    this.getComics(width);
    this.getEvents(width);
    this.getSeries(width);
  }
  

  getComics( width: any ) {
    this.route.params.pipe(switchMap((params: Params) => {
      return this.issuesService.getComicCharacter(params['id'])}))
        .subscribe( comics => {
          this.comics = comics;
          console.log(this.comics);
          this.resultsComics = this.comics.count;
          if ( this.resultsComics <= 1) { //This if avoids the changeSize function if the number of issues is less or equal to 1
            console.log(this.resultsComics);
          } else {
            this.changeSizeComics(width, this.resultsComics); // This function sizes the carousel
          }
        },
        errmess => {
          this.errMsg = <any>errmess;
        });
  }

  getEvents(width: any) {
    this.route.params.pipe(switchMap((params: Params) => {
      return this.issuesService.getEventsCharacter(params['id'])}))
        .subscribe( events => {
          this.events = events;
          this.resultsEvents = this.events.count;
          if ( this.resultsEvents <= 1) { //This if avoids the changeSize function if the number of issues is less or equal to 1
          } else {
            this.changeSizeEvents(width, this.resultsEvents); // This function sizes the carousel
          }
        },
        errmess => {
          this.errMsg = <any>errmess;
        });
  }

  getSeries(width:any) {
    this.route.params.pipe(switchMap((params: Params) => {
      return this.issuesService.getSeriesCharacter(params['id'])}))
        .subscribe( series => {
          this.series = series;
          this.resultsSeries = this.series.count;
          if ( this.resultsSeries <= 1) { //This if avoids the changeSize function if the number of issues is less or equal to 1
            console.log(this.resultsSeries);
          } else {
            this.changeSizeSeries(width, this.resultsSeries); // This function sizes the carousel
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
    this.changeSizeSeries(event.target.innerWidth, this.series.count)
  }

  // changing size for comics
  changeSizeComics(arg: any, counter: number) {
    let changesizeCarouselArray = changeSizeCarousel(arg, counter);
    this.Comicsclass = changesizeCarouselArray[0];
    this.shownNumber = changesizeCarouselArray[1];
    this.forNumber = changesizeCarouselArray[2];
  }

  changeSizeEvents(arg: any, counter: number) {
    let changesizeCarouselArray = changeSizeCarousel(arg, counter);
    this.Eventsclass = changesizeCarouselArray[0];
    this.shownNumberE = changesizeCarouselArray[1];
    this.forNumberE = changesizeCarouselArray[2];
  }

  // changing size for series
  changeSizeSeries(arg: any, counter: number) {
    let changesizeCarouselArray = changeSizeCarousel(arg, counter);
    this.Seriescslass = changesizeCarouselArray[0];
    this.shownNumberS = changesizeCarouselArray[1];
    this.forNumberS = changesizeCarouselArray[2];
  }

}
