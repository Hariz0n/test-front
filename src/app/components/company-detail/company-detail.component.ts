import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyResponseDto } from '../../dtos/CompanyResponseDto';
import { CompaniesService } from '../../services/companies.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company-detail.component.html',
  styleUrl: './company-detail.component.scss'
})
export class CompanyDetailComponent implements OnInit {
  protected company$: Observable<CompanyResponseDto> | null = null;

  constructor(private activatedRoute: ActivatedRoute, private companiesService: CompaniesService) {}

  ngOnInit(): void {
    this.company$ = this.companiesService.getCompany(this.activatedRoute.snapshot.paramMap.get('companyId')!) 
  }
}
