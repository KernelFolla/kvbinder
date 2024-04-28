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
    path: 'items-new',
    loadComponent: () => import('./pages/item-create.component').then(m => m.ItemCreateComponent)
  },
  {
    path: 'items-import',
    loadComponent: () => import('./pages/item-import.component').then(m => m.ItemImportComponent)
  },
  {
    path: 'items-export',
    loadComponent: () => import('./pages/item-export.component').then(m => m.ItemExportComponent)
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
