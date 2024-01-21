import { Component, OnInit } from '@angular/core';
import { CompaniesSortService } from '../../services/companies-sort.service';
import { sortingValueType } from '../../types/sortingValueType';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company-sort',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company-sort.component.html',
  styleUrl: './company-sort.component.scss',
})
export class CompanySortComponent implements OnInit {
  sortingData: sortingValueType = null;

  onButtonClick(value: Exclude<sortingValueType, null>['field'] | 'no-sort') {
    if (value === 'no-sort') {
      this.companiesSortService.changeSortingValue(null);
    } else {
      this.companiesSortService.changeSortingValue({ field: value, isAscending: this.sortingData?.field === value && !this.sortingData.isAscending });
    }
  }

  constructor(private companiesSortService: CompaniesSortService) {}

  ngOnInit(): void {
    this.companiesSortService.getSortingValue().subscribe(data => this.sortingData = data)
  }
}
