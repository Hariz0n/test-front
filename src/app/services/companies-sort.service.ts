import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { sortingValueType } from '../types/sortingValueType';

@Injectable({
  providedIn: 'root'
})
export class CompaniesSortService {
  sortingValue: BehaviorSubject<sortingValueType> = new BehaviorSubject<sortingValueType>({field: 'business_name', isAscending: true})

  getSortingValue() {
    return this.sortingValue;
  }

  changeSortingValue(sortingValue: sortingValueType) {   
    this.sortingValue.next(sortingValue)
  }

  constructor() { }
}
