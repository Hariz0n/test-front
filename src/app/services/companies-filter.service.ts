import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filteringParamsType } from '../types/filteringValueType';

@Injectable({
  providedIn: 'root',
})
export class CompaniesFilterService {
  private filteringParams$: BehaviorSubject<filteringParamsType> =
    new BehaviorSubject<filteringParamsType>({
      business_name: '',
      industry: 'all',
      type: 'all',
    });

  getFilteringParams() {
    return this.filteringParams$;
  }

  changeFilteringParams(filteringParams: filteringParamsType) {
    this.filteringParams$.next(filteringParams)
  }

  constructor() {}
}
