import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeroesCatalogComponent } from './heroes-catalog/heroes-catalog.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

import { CharacterService } from './services/character.service';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { baseURL } from './shared/baseUrl';

@NgModule({
  declarations: [
    AppComponent,
    HeroesCatalogComponent,
    HeaderComponent,
    FooterComponent,
    HeroDetailComponent  
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [
    CharacterService,
    { provide: 'BaseURL', useValue: baseURL }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
