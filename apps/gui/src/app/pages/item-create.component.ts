import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemService } from '@kvbinder/api-client-angular';
import { Item, ItemFormComponent } from '../components/item-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationComponent } from '../components/navigation.component';
import { NgxBackButtonService } from 'ngx-back-button';

@Component({
  selector: 'app-item-create',
  standalone: true,
  imports: [CommonModule, ItemFormComponent, NavigationComponent],
  template: `
    <app-navigation>
      <h1>Create Item</h1>
      <app-item-form (formSubmit)="onSubmit($event)" (undo)="onUndo()"></app-item-form>
    </app-navigation>
  `,
  styles: ``
})
export class ItemCreateComponent {
  constructor(
    private api: ItemService, private snackBar: MatSnackBar,
    private back: NgxBackButtonService
  ) {

  }

  onSubmit($event: Item) {
    this.api.updateItem($event.key, $event.value).subscribe(() => {
      this.snackBar.open('Item saved successfully!', '', { duration: 2000 });

    });
  }

  onUndo() {
    this.back.back();
  }
}
