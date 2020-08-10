import { Routes } from '@angular/router';
import { HeroesCatalogComponent } from '../heroes-catalog/heroes-catalog.component';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';

export const routes: Routes = [
    { path: 'character-catalog', component: HeroesCatalogComponent },
    { path: 'character/:id', component: HeroDetailComponent },
    { path: '', redirectTo: '/character-catalog', pathMatch: 'full'}
];