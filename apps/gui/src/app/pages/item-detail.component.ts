import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Item, ItemService } from '@kvbinder/api-client-angular';
import { ItemFormComponent } from '../components/item-form.component';
import { NavigationComponent } from '../components/navigation.component';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbar } from '@angular/material/toolbar';
import { NgxBackButtonService } from 'ngx-back-button';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [CommonModule, ItemFormComponent, NavigationComponent, MatButton, RouterLink, MatDivider, MatToolbar],
  template: `
    <app-navigation>
      <ng-container *ngIf="item$ | async as item; else loading">
        <div *ngIf="isEditing; else detail">
          <h1>Edit item "{{ item.key }}"</h1>
          <app-item-form [item]="item" (formSubmit)="onEditSubmit($event)" (undo)="onEditUndo()"></app-item-form>
        </div>
        <ng-template #detail>
          <h1>Item detail "{{ item.key }}"</h1>
          <mat-divider></mat-divider>
          {{ item.value | json }}
          <mat-divider></mat-divider>
          <mat-toolbar class="form-actions">
            <button mat-raised-button color="primary" (click)="isEditing = true">Edit</button>
            <button mat-raised-button color="warn" (click)="onDelete(item.key)">Delete</button>
          </mat-toolbar>
        </ng-template>
      </ng-container>
      <ng-template #loading>loading...</ng-template>
    </app-navigation>`,
  styles: `
    mat-divider {
      margin: 1rem 0;
    }`
})
export class ItemDetailComponent implements OnInit {
  key?: string;
  item$!: Observable<Item>;
  isEditing = false;

  constructor(
    private route: ActivatedRoute,
    private api: ItemService,
    private snackBar: MatSnackBar,
    private back: NgxBackButtonService
  ) {
  }

  ngOnInit() {
    this.item$ = this.route.paramMap.pipe(
      switchMap(params => {
        const key = params.get('key') || undefined;
        if (!key) throw new Error('No key provided');
        return this.api.getItem(key).pipe(
          map(value => ({ key: key, value }))
        );
      })
    );
  }

  onEditSubmit($event: Item) {
    this.api.updateItem($event.key, $event.value).subscribe(() => {
      this.isEditing = false;
      this.snackBar.open('Item saved successfully!', '', { duration: 2000 });
    });
  }

  onEditUndo() {
    this.isEditing = false;
  }

  onDelete(key: string) {
    this.api.deleteItem(key).subscribe(() => {
      this.snackBar.open('Item deleted successfully!', '', { duration: 2000 });
      this.back.back();
    });
  }
}
