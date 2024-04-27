import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'items',
    loadComponent: () => import('./pages/item-list.component').then(m => m.ItemListComponent)
  },
  {
    path: 'items/new',
    loadComponent: () => import('./pages/item-create.component').then(m => m.ItemCreateComponent)
  },
  {
    path: 'items/:key',
    loadComponent: () => import('./pages/item-detail.component').then(m => m.ItemDetailComponent)
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];
