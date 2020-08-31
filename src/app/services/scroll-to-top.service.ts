import { Injectable, Inject, PLATFORM_ID  } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScrollToTopService {
  //https://dev.to/teroauralinna/scroll-to-the-top-on-angular-route-change-1gn5
  constructor( 
    @Inject(PLATFORM_ID) 
    private platformId: object, 
    private router: Router) { }

    setScrollTop() {
      if (isPlatformBrowser(this.platformId)) {
        this.router.events.subscribe((event: NavigationEnd) => {
        });
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'});
      }
    }
}
