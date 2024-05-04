import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Observable, catchError, of } from 'rxjs';

// Angular Material
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

// Other
import dayjs from 'dayjs';

import { Company } from '../models/company.model';
import { CompaniesBackendService } from '../services/companies-backend.service';
import { Vacancy } from '../models/vacancy.model';

@Component({
  selector: 'app-vacancies-form',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
  ],
  templateUrl: './vacancies-form.component.html',
  styleUrl: './vacancies-form.component.scss',
})
export class VacanciesFormComponent implements OnInit {
  vacancyForm = new FormGroup({
    companyId: new FormControl('', [Validators.required]),
    position: new FormControl('', [Validators.required]),
    location: new FormControl(''),
    description: new FormControl(''),
    salary: new FormControl(''),
    startdate: new FormControl(''),
    enddate: new FormControl(''),
  });

  companies: Company[] = [];

  datePickerMinDate = new Date();
  vacancyEndDateMinDate: Date | undefined;

  constructor(
    private backend: CompaniesBackendService,
    public dialogRef: MatDialogRef<VacanciesFormComponent>
  ) {}

  ngOnInit(): void {
    this.backend
      .getCompanies()
      .subscribe((companies) => (this.companies = companies));

    this.vacancyForm.get('startdate')?.valueChanges.subscribe((value) => {
      this.vacancyEndDateMinDate = dayjs(value).toDate();
    });
  }

  submit() {
    if (this.vacancyForm.valid) {
      const newVacancy = {
        ...this.vacancyForm.value,
        created: dayjs().toISOString(),
      };
      this.backend
        .newVacancy(newVacancy as Partial<Vacancy>)
        .pipe(
          catchError((error: any, vacancy: Observable<Vacancy>) => {
            // TODO: handle error
            console.error(error, vacancy);
            return of('newVacancy');
          })
        )
        .subscribe((newVacancy) => {
          this.dialogRef.close();
        });
    }
  }
}
