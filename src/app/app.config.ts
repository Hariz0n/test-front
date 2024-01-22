import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AngularYandexMapsModule, YaConfig } from 'angular8-yandex-maps';

const mapConfig: YaConfig = {
  apikey: 'API_KEY',
  lang: 'ru_RU',
};

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(AngularYandexMapsModule.forRoot(mapConfig))]
};
