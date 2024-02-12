import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import ('./components/contact-list/contact-list.component')
  },
  {
    path: 'new',
    loadComponent: () => import ('./components/contact-create/contact-create.component')
  },
  {
    path: ':id/edit',
    loadComponent: () => import ('./components/contact-create/contact-create.component')
  }

];
