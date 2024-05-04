import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Company } from '../models/company.model';
import { Vacancy } from '../models/vacancy.model';

@Injectable({
  providedIn: 'root',
})
export class CompaniesBackendService {
  private apiUrl = '/api';
  private companiesPathName = 'companies';
  private vacanciesPathName = 'vacancies';

  constructor(private http: HttpClient) {}

  getCompanies() {
    return this.http.get<Company[]>(`${this.apiUrl}/${this.companiesPathName}`);
  }

  getVacancies() {
    return this.http.get<Vacancy[]>(`${this.apiUrl}/${this.vacanciesPathName}`);
  }

  newVacancy(vacancy: Partial<Vacancy>) {
    return this.http.post<Vacancy>(
      `${this.apiUrl}/${this.vacanciesPathName}`,
      vacancy
    );
  }

  getCompany(id: string) {
    return this.http.get<Company>(
      `${this.apiUrl}/${this.companiesPathName}/${id}`
    );
  }
}
