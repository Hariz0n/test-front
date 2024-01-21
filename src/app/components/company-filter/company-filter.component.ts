import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CompaniesFilterService } from '../../services/companies-filter.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

type FilterGroupType = {
  business_name: FormControl<string | null>;
  type: FormControl <'all' | string | null>;
  industry: FormControl<'all' | string | null>;
};

@Component({
  selector: 'app-company-filter',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './company-filter.component.html',
  styleUrl: './company-filter.component.scss'
})
export class CompanyFilterComponent implements OnInit {
  @Input('types') filteringTypes: string[] = []
  @Input('industries') filteringIndustries: string[] = []

  formChangeSubscription!: Subscription

  filterForm: FormGroup<FilterGroupType> = this.formBuilder.group({
    business_name: [''],
    type: ['all'],
    industry: ['all']
  });

  constructor(
    private companiesFilterService: CompaniesFilterService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formChangeSubscription = this.filterForm.valueChanges.subscribe((formValues) => {
      this.companiesFilterService.changeFilteringParams({
        business_name: formValues.business_name!,
        type: formValues.type!,
        industry: formValues.industry!
      })
    })
  }
}
