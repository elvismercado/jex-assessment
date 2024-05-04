import { Routes } from '@angular/router';
import { VacanciesComponent } from './vacancies/vacancies.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { VacancyComponent } from './vacancy/vacancy.component';

export const routes: Routes = [
  {
    path: 'vacancies',
    component: VacanciesComponent,
  },
  {
    path: 'vacancies/:id',
    component: VacancyComponent,
  },
  { path: '', redirectTo: 'vacancies', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
