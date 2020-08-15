import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { switchMap } from 'rxjs/operators';
import { CharacterService } from '../services/character.service';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./comics.component.scss']
})
export class ComicsComponent implements OnInit {

  comics: any;
  id: number | any;
  closeResult: string;
  selectedComic: any;
  newDate: string;
  errMsg: string;

  constructor(private characterService: CharacterService,
    private route: ActivatedRoute,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getComics();
  }

  getComics() {
    this.route.params.pipe(switchMap((params: Params) => {
      return this.characterService.getComicCharacter(params['id'])}))
        .subscribe( comics => {
          this.comics = comics;
        },
        errmess => {
          this.errMsg = <any>errmess;
        });
  }

  openScrollableContent(longContent) {
    this.modalService.open(longContent, { scrollable: true });
  }


}
