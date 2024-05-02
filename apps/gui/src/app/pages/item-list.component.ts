import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemFormComponent } from '../components/item-form.component';
import { Observable } from 'rxjs';
import { ItemService } from '@kvbinder/api-client-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, ItemFormComponent, RouterLink],
  template: `
    <h1>Items</h1>
    <ul>
      <li *ngFor="let item of items$ | async">
        <a [routerLink]="['/items', item]">{{ item }}</a>
      </li>
    </ul>
  `,
  styles: ``
})
export class ItemListComponent {
  items$: Observable<string[]>;

  constructor(private api: ItemService) {
    this.items$ = this.api.getKeys();
  }
}
