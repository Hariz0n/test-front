import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompanyResponseDto } from '../dtos/CompanyResponseDto';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  private companiesCache$: Observable<CompanyResponseDto[]> | null = null;
  private companyListCache$: Map<string, Observable<CompanyResponseDto>> =
    new Map();

  getCompanies() {
    if (!this.companiesCache$) {
      this.companiesCache$ = this.http
        .get<CompanyResponseDto[]>(
          'https://random-data-api.com/api/company/random_company?size=100'
        )
        .pipe(shareReplay());
    }

    return this.companiesCache$;
  }

  getCompany(companyId: string) {
    if (!this.companyListCache$.has(companyId)) {
      this.companyListCache$.set(
        companyId,
        this.http.get<CompanyResponseDto>(
          `https://random-data-api.com/api/company/random_company?uid=${companyId}`
        ).pipe(shareReplay())
      );
    }
    return this.companyListCache$.get(companyId)!;
  }

  constructor(private http: HttpClient) {}
}
