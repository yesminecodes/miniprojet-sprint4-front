import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { App } from './app/app';
import { routes } from './app/app.routes';

import { provideKeycloak } from 'keycloak-angular';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),

    provideKeycloak({
      config: {
        url: 'http://localhost:8090',
        realm: 'yesmine-realm',
        clientId: 'game-app'
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false
      }
    })
  ]
}).catch(err => console.error(err));