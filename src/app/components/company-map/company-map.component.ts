import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularYandexMapsModule, YaReadyEvent } from 'angular8-yandex-maps';
import { CompaniesService } from '../../services/companies.service';
import { Observable, Subscription } from 'rxjs';
import { CompanyResponseDto } from '../../dtos/CompanyResponseDto';
import { CommonModule } from '@angular/common';

type Placemark = {
  geometry: number[];
  properties: ymaps.IPlacemarkProperties;
  options: ymaps.IPlacemarkOptions;
};

@Component({
  selector: 'app-company-map',
  standalone: true,
  imports: [AngularYandexMapsModule, CommonModule],
  templateUrl: './company-map.component.html',
  styleUrl: './company-map.component.scss',
})
export class CompanyMapComponent implements OnInit, OnDestroy {
  protected companies: CompanyResponseDto[] = [];
  private _sub = new Subscription();

  protected placemarks: Placemark[] = [];
  private yaMap: ymaps.Map | null = null;

  clusterOptions: ymaps.IClustererOptions = {
    gridSize: 32,
    clusterDisableClickZoom: true,
    preset: 'islands#greenClusterIcons',
  };

  constructor(private companiesService: CompaniesService) {}

  onObjectManagerReady(event: YaReadyEvent<ymaps.Map>): void {
    this.yaMap = event.target;
  }

  onCompanyButtonClick(coords: [number, number]) {
    if (this.yaMap) {
      this.yaMap.setCenter(coords);
    }
  }

  ngOnInit(): void {
    const sub = this.companiesService.getCompanies().subscribe((companies) => {
      this.companies = companies;
      companies.forEach((company) => {
        this.placemarks.push({
          geometry: [company.latitude, company.longitude],
          properties: {
            balloonContentHeader: company.business_name,
            balloonContentBody: company.industry,
            balloonContentFooter: company.phone_number,
          },
          options: {
            preset: 'islands#greenDotIcon',
          },
        });
      });
    });
    this._sub.add(sub);
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }
}
