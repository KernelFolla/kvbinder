import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item, ItemService } from '@kvbinder/api-client-angular';
import { ItemFormComponent } from '../components/item-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationComponent } from '../components/navigation.component';
import { NgxBackButtonService } from 'ngx-back-button';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatToolbar } from '@angular/material/toolbar';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { jsonValidator } from '../utils';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-item-import',
  standalone: true,
  imports: [CommonModule, ItemFormComponent, NavigationComponent, MatButton, MatError, MatFormField, MatInput, MatLabel, MatToolbar, ReactiveFormsModule, MatIcon],
  template: `
    <app-navigation>
      <h1>Import Items</h1>
      <div class="form-group value-field">
        <button mat-raised-button (click)="fileInput.click()">Load data from file</button>
        <input type="file" #fileInput hidden (change)="onFileSelected($any($event))">
      </div>
      <form [formGroup]="jsonForm" (ngSubmit)="onJsonSubmit()">
        <div class="form-group value-field">
          <mat-form-field appearance="outline">
            <mat-label>Value (JSON):</mat-label>
            <textarea matInput formControlName="value" required></textarea>
            <mat-error *ngIf="jsonForm.get('value')?.hasError('required')">Value is required</mat-error>
            <mat-error *ngIf="jsonForm.get('value')?.hasError('invalidJson')">Invalid JSON format</mat-error>
          </mat-form-field>
        </div>
        <mat-toolbar class="form-actions">
          <button mat-raised-button type="submit" color="primary" [disabled]="jsonForm.invalid">Submit</button>
          <button mat-raised-button (click)="onUndo()">Undo</button>
        </mat-toolbar>
      </form>
    </app-navigation>
  `,
  styles: `
    mat-form-field {
      margin-top: 1rem;
      width: 100%;
    }
  `
})
export class ItemImportComponent {
  fileForm!: FormGroup;
  jsonForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ItemService,
    private snackBar: MatSnackBar,
    private back: NgxBackButtonService
  ) {
    this.fileForm = this.fb.group({
      file: ['', Validators.required, jsonValidator]
    });
    this.jsonForm = this.fb.group({
      value: ['', [Validators.required, jsonValidator]]
    });
  }

  submit(data: Item[]) {
    if (!data) return;
    this.api.importItems(data).subscribe(() => {
      this.snackBar.open('Items saved successfully!', '', { duration: 2000 });
    });
  }

  onUndo() {
    this.back.back();
  }

  onJsonSubmit() {
    this.submit(JSON.parse(this.jsonForm.get('value')?.value));
  }

  onFileSelected($event: Event & { target: HTMLInputElement }) {
    $event.target.files?.[0]?.text().then(text => {
      this.jsonForm.patchValue({ value: text });
    });
  }
}
