import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/company-list/company-list.component').then(
            (m) => m.CompanyListComponent
          ),
      },
      {
        path: 'detail/:companyId',
        loadComponent: () =>
          import('./components/company-detail/company-detail.component').then(
            (m) => m.CompanyDetailComponent
          ),
      },
      {
        path: 'map',
        loadComponent: () =>
          import('./components/company-map/company-map.component').then(
            (m) => m.CompanyMapComponent
          ),
      },
    ],
  },
  { path: 'help', redirectTo: '', pathMatch: 'full' },
];
