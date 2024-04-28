import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemService } from '@kvbinder/api-client-angular';
import { ItemFormComponent } from '../components/item-form.component';
import { NavigationComponent } from '../components/navigation.component';
import { NgxBackButtonService } from 'ngx-back-button';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatToolbar } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatProgressBar } from '@angular/material/progress-bar';

const JSONToFile = (obj: object, filename: string) => {
  const blob = new Blob([JSON.stringify(obj, null, 2)], {
    type: 'application/json'
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.json`;
  a.click();
  URL.revokeObjectURL(url);
};


@Component({
  selector: 'app-item-import',
  standalone: true,
  imports: [CommonModule, ItemFormComponent, NavigationComponent, MatButton, MatError, MatFormField, MatInput, MatLabel, MatToolbar, ReactiveFormsModule, MatIcon, MatProgressBar],
  template: `
    <app-navigation>
      <h1>Export Items</h1>
      <mat-toolbar class="form-actions">
        <button mat-raised-button (click)="onDownload()">Download</button>
        <button mat-raised-button (click)="onShow()">Show</button>
        <button mat-raised-button (click)="onUndo()">Undo</button>
      </mat-toolbar>
      @if (isLoading) {
        <mat-progress-bar mode="indeterminate"></mat-progress-bar>
      }
      @if (items) {
        {{ items | json }}
      }
    </app-navigation>
  `,
  styles: ``
})
export class ItemExportComponent {
  isLoading = false;
  items?: object;

  constructor(
    private api: ItemService,
    private back: NgxBackButtonService
  ) {
  }

  onUndo() {
    this.back.back();
  }

  onDownload() {
    this.isLoading = true;
    this.api.getItems().subscribe((items) => {
      this.isLoading = false;
      JSONToFile(items, 'items');
    });
  }

  onShow() {
    this.isLoading = true;
    this.items = undefined;
    this.api.getItems().subscribe((items) => {
      this.isLoading = false;
      this.items = items;
    });
  }
}
