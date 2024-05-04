import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { combineLatest, map, mergeMap, of } from 'rxjs';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatButton } from '@angular/material/button';

import { Company } from '../models/company.model';
import { Vacancy } from '../models/vacancy.model';
import { CompaniesBackendService } from '../services/companies-backend.service';

@Component({
  selector: 'app-vacancy',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatDividerModule,
    RouterLink,
    MatButton,
  ],
  templateUrl: './vacancy.component.html',
  styleUrl: './vacancy.component.scss',
})
export class VacancyComponent {
  vacancy!: Vacancy;
  company!: Company;

  constructor(
    private backend: CompaniesBackendService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getVacancy(params['id']);
    });
  }

  private getVacancy(vacancyId: string) {
    this.backend
      .getVacancies()
      .pipe(
        map((vacancies) => {
          return vacancies.filter((vacancy) => vacancy.id === vacancyId);
        }),
        map((vacancies) => vacancies[0]),
        mergeMap((vacancy) => {
          return combineLatest([
            of(vacancy),
            this.backend.getCompany(vacancy.companyId),
          ]);
        })
      )
      .subscribe(([vacancy, company]) => {
        this.vacancy = vacancy;
        this.company = company;
      });
  }
}
