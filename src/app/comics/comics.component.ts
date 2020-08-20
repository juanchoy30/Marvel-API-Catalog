import { Component, OnInit, ViewEncapsulation, HostListener, Input} from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { switchMap } from 'rxjs/operators';
import { CharacterService } from '../services/character.service';

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
  id: number | any;
  closeResult: string;
  selectedComic: any;
  newDate: string;
  errMsg: string;
  class: string;                // Style of carousel
  @Input() shownNumber: number; // To size the carousel
  @Input() forNumber: number;   // To size the carousel

  constructor(
    private characterService: CharacterService,
    private issuesService: IssuesService,
    private route: ActivatedRoute,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getComics();
    this.getEvents();
  }

  getComics() {
    this.route.params.pipe(switchMap((params: Params) => {
      return this.issuesService.getComicCharacter(params['id'])}))
        .subscribe( comics => {
          this.comics = comics;
          this.changeSize(window.screen.width); // This function sizes the carousel
        },
        errmess => {
          this.errMsg = <any>errmess;
        });
  }

  getEvents() {
    this.route.params.pipe(switchMap((params: Params) => {
      return this.characterService.getEventsCharacter(params['id'])}))
        .subscribe( events => {
          this.events = events;
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
    this.changeSize(event.target.innerWidth);
  }


  changeSize(arg: any) {
    if (arg <= 375) { 
      this.class = 'card-container col-12';
      this.shownNumber = 1;
      this.forNumber = 0;
    } else if (arg <= 425) {
      this.class = 'card-container col-12';
      this.shownNumber = 1;
      this.forNumber = 0;
    } else if (arg <= 768) {

      if ( this.comics.count <= 3 ) {
        this.class = 'card-container col-6';
        this.shownNumber = this.comics.count;
        this.forNumber = this.comics.count-1;
      } else {
        this.class = 'card-container col-6';
        this.shownNumber = 2;
        this.forNumber = 1;
      }

    } else if (arg <= 1024) {

      if ( this.comics.count <= 3 ) {
        this.class = 'card-container col-6';
        this.shownNumber = this.comics.count;
        this.forNumber = this.comics.count-1;
      } else {
        this.class = 'card-container col-4';
        this.shownNumber = 3;
        this.forNumber = 2;
      }

    } else if (arg <= 1440) {

      if ( this.comics.count <= 3 ) {
        this.class = 'card-container col-4';
        this.shownNumber = this.comics.count;
        this.forNumber = this.comics.count-1;
      } else {
        this.class = 'card-container col-3';
        this.shownNumber = 4;
        this.forNumber = 3;
      }

    }
  }
  

}
