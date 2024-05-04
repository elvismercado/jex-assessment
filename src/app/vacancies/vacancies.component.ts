import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { map } from 'rxjs';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

// Other
import dayjs from 'dayjs';

import { CompaniesBackendService } from '../services/companies-backend.service';
import { Vacancy } from '../models/vacancy.model';
import { Company } from '../models/company.model';
import { VacanciesFormComponent } from '../vacancies-form/vacancies-form.component';
import { DeeplinkComponent } from '../deeplink/deeplink.component';

@Component({
  selector: 'app-vacancies',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './vacancies.component.html',
  styleUrl: './vacancies.component.scss',
})
export class VacanciesComponent implements OnInit {
  vacancies: Vacancy[] = [];
  companies: Company[] = [];

  filteredCompany: Company | undefined;

  get filteredVacancies() {
    if (!this.filteredCompany) {
      return this.vacancies;
    }
    return this.vacancies.filter((vacancy) => {
      return vacancy.companyId === this.filteredCompany?.id;
    });
  }

  constructor(
    private backend: CompaniesBackendService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getVacancies();
    this.getCompanies();
  }

  getCompany(id: string) {
    return this.companies.find((company) => company.id === id)?.name;
  }

  newVacancy() {
    const dialogRef = this.dialog.open(VacanciesFormComponent, {
      minWidth: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getVacancies();
    });
  }

  createDeeplink(vacancy: Vacancy) {
    this.dialog.open(DeeplinkComponent, {
      minWidth: '50%',
      data: {
        vacancy,
      },
    });
  }

  private getVacancies() {
    this.backend
      .getVacancies()
      .pipe(
        // making sure to only show vacancies that are not expired or have no startdate
        map((vacancies) => {
          return vacancies.filter((vacancy) => {
            if (
              !vacancy.startdate ||
              (vacancy.startdate &&
                dayjs(vacancy.startdate).isBefore(dayjs().add(1, 'day')) &&
                dayjs(vacancy.enddate).isAfter(dayjs().subtract(1, 'day')))
            ) {
              return true;
            }
            return false;
          });
        }),
        // Sort by newest taking into consideration that startdate can by ommited
        map((vacancies) => {
          return vacancies.sort((a, b) => {
            if (b.startdate && a.startdate) {
              return (
                dayjs(b.startdate).valueOf() - dayjs(a.startdate).valueOf()
              );
            } else if (b.startdate) {
              return dayjs(b.startdate).valueOf() - dayjs(a.created).valueOf();
            } else if (a.startdate) {
              return dayjs(b.created).valueOf() - dayjs(a.startdate).valueOf();
            }
            return dayjs(b.created).valueOf() - dayjs(a.created).valueOf();
          });
        })
      )
      .subscribe((vacancies) => {
        this.vacancies = vacancies;
      });
  }

  private getCompanies() {
    this.backend
      .getCompanies()
      .subscribe((companies) => (this.companies = companies));
  }
}
