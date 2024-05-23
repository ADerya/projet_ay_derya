import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { PanierState } from './shared/states/panier-state';
import { ApiHttpInterceptor } from './http-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: ApiHttpInterceptor, multi: true },
    importProvidersFrom(NgxsModule.forRoot([PanierState]))
  ]
};
