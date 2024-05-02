import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';
import { jsonValidator } from '../utils';

export interface Item {
  key: string;
  value: object;
}

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatToolbar],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <mat-form-field appearance="outline">
          <mat-label>Key:</mat-label>
          <input type="text" matInput formControlName="key" required>
          <mat-error *ngIf="form.get('key')?.hasError('required')">Key is required</mat-error>
        </mat-form-field>
      </div>
      <div class="form-group value-field">
        <mat-form-field appearance="outline">
          <mat-label>Value (JSON):</mat-label>
          <textarea matInput formControlName="value" required></textarea>
          <mat-error *ngIf="form.get('value')?.hasError('required')">Value is required</mat-error>
          <mat-error *ngIf="form.get('value')?.hasError('invalidJson')">Invalid JSON format</mat-error>
        </mat-form-field>
      </div>
      <mat-toolbar class="form-actions">
        <button aria-label="Submit" mat-raised-button type="submit" color="primary" [disabled]="form.invalid">
          Submit
        </button>
        <button aria-label="Undo" mat-raised-button (click)="onUndo()">
          Undo
        </button>
      </mat-toolbar>
    </form>
  `,
  styles: [`
    form {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    mat-form-field {
      width: 100%;
    }
  `]
})
export class ItemFormComponent implements OnInit {
  @Input() item?: Item;
  @Output() formSubmit = new EventEmitter<Item>();
  @Output() undo = new EventEmitter<void>();
  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      key: ['', Validators.required],
      value: ['', [Validators.required, jsonValidator]]
    });
  }

  ngOnInit(): void {
    if (this.item) {
      this.form.patchValue({
        key: this.item.key,
        value: JSON.stringify(this.item.value, null, 2)
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const { key, value } = this.form.value;
      const jsonData = JSON.parse(value);
      this.formSubmit.emit({ key, value: jsonData });
    }
  }

  onUndo() {
    this.undo.emit();
  }
}
