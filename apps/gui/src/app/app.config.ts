import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ApiModule, Configuration } from '@kvbinder/api-client-angular';
import { HttpClientModule } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule, ApiModule.forRoot(() => new Configuration({
      basePath: 'http://localhost:4200/api'
    })))
  ]
};
