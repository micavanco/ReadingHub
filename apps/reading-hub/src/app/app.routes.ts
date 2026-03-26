import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./features/library').then(
        (module) => module.LibraryPage,
      ),
  },
];
