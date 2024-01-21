import { Component, OnDestroy, OnInit } from '@angular/core';
import { CompanyItemComponent } from '../company-item/company-item.component';
import { CompanyResponseDto } from '../../dtos/CompanyResponseDto';
import { CommonModule } from '@angular/common';
import { CompaniesService } from '../../services/companies.service';
import { Observable, Subject, Subscription, combineLatest, map } from 'rxjs';
import { CompaniesSortService } from '../../services/companies-sort.service';
import { sortingValueType } from '../../types/sortingValueType';
import { CompaniesFilterService } from '../../services/companies-filter.service';
import { CompanySortComponent } from '../company-sort/company-sort.component';
import { CompanyFilterComponent } from '../company-filter/company-filter.component';

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [
    CompanyItemComponent,
    CommonModule,
    CompanySortComponent,
    CompanyFilterComponent,
  ],
  providers: [],
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss',
})
export class CompanyListComponent implements OnInit, OnDestroy {
  private companies$!: Observable<CompanyResponseDto[]>;
  protected sortedAndFilteredCompanies!: Observable<CompanyResponseDto[]>;

  protected filteringTypes: string[] = [];
  private filteringTypesSubscription!: Subscription;

  protected filteringIndustries: string[] = [];
  private filteringIndustriesSubscription!: Subscription;

  constructor(
    private companyService: CompaniesService,
    private companiesSortService: CompaniesSortService,
    private companiesFilterService: CompaniesFilterService
  ) {}

  ngOnInit(): void {
    this.companies$ = this.companyService.getCompanies()

    this.filteringTypesSubscription = this.companies$
      .subscribe((data) => {
        this.filteringTypes = [
          ...data
            .reduce((prev, curr) => prev.add(curr.type), new Set<string>())
            .values(),
        ];
      });

    this.filteringIndustriesSubscription = this.companies$
      .subscribe((data) => {
        this.filteringIndustries = [
          ...data
            .reduce((prev, curr) => prev.add(curr.industry), new Set<string>())
            .values(),
        ];
      });

    this.sortedAndFilteredCompanies = combineLatest([
      this.companies$,
      this.companiesSortService.getSortingValue(),
      this.companiesFilterService.getFilteringParams(),
    ]).pipe(
      map(([companies, sortingParams, filteringParams]) => {
        let result: CompanyResponseDto[] = companies.filter((company) => {
          const isNameMatches =
            company.business_name
              .toLocaleLowerCase()
              .includes(filteringParams.business_name.toLocaleLowerCase()) &&
            filteringParams.industry;

          const isTypeMatches =
            filteringParams.type === 'all' ||
            company.type === filteringParams.type;

          const isIndustryMatches =
            filteringParams.industry === 'all' ||
            company.industry === filteringParams.industry;

          return isNameMatches && isTypeMatches && isIndustryMatches;
        });

        if (sortingParams) {
          result.sort((a, b) => {
            return (
              a[sortingParams.field].localeCompare(b[sortingParams.field]) *
              (sortingParams.isAscending ? 1 : -1)
            );
          });
        }

        return result;
      })
    );
  }

  ngOnDestroy(): void {
    this.filteringIndustriesSubscription.unsubscribe();
    this.filteringTypesSubscription.unsubscribe();
  }
}
