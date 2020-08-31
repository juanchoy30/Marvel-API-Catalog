import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbTypeaheadModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HeroesCatalogComponent } from './heroes-catalog/heroes-catalog.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

import { CharacterService } from './services/character.service';
import { SearchServiceService } from './services/search-service.service';
import { IssuesService } from './services/issues.service';
import { ProcessHTTPMsgService } from './services/process-httpmsg.service';
import { ScrollToTopService } from './services/scroll-to-top.service';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { baseURL } from './shared/baseUrl';
import { ComicsComponent } from './comics/comics.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesCatalogComponent,
    HeaderComponent,
    FooterComponent,
    HeroDetailComponent,
    ComicsComponent,
    NavBarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    NgbTypeaheadModule, 
    NgbModalModule
  ],
  providers: [
    CharacterService,
    SearchServiceService,
    IssuesService,
    ProcessHTTPMsgService,
    ScrollToTopService,
    { provide: 'BaseURL', useValue: baseURL }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
