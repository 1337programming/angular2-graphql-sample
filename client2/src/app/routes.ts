import {provideRouter, RouterConfig} from '@angular/router';

export const routes:RouterConfig = [
  {
    path: '',
    redirectTo: '/home',
    terminal: true
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
