import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemService } from '@kvbinder/api-client-angular';
import { Item, ItemFormComponent } from '../components/item-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-item-create',
  standalone: true,
  imports: [CommonModule, ItemFormComponent, NavigationComponent],
  template: `
    <app-navigation>
      <h1>Create Item</h1>
      <app-item-form (formSubmit)="onSubmit($event)"></app-item-form>
    </app-navigation>
  `,
  styles: ``
})
export class ItemCreateComponent {
  constructor(private api: ItemService, private snackBar: MatSnackBar) {

  }

  onSubmit($event: Item) {
    this.api.updateItem($event.key, $event.value).subscribe(() => {
      this.snackBar.open('Form submitted successfully!', '', { duration: 2000 });
    });
  }
}
