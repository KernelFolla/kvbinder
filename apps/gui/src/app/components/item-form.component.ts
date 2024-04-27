import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

export interface Item {
  key: string;
  value: object;
}

const jsonValidator = (control: FormControl) => {
  try {
    JSON.parse(control.value);
  } catch (e) {
    return { invalidJson: true };
  }
  return null;
};

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <mat-form-field appearance="outline">
          <mat-label>Key:</mat-label>
          <input type="text" matInput formControlName="key" required>
          <mat-error *ngIf="form.get('key')?.hasError('required')">Key is required</mat-error>
        </mat-form-field>
      </div>
      <div class="form-group">
        <mat-form-field appearance="outline">
          <mat-label>Value (JSON):</mat-label>
          <textarea matInput formControlName="value" required></textarea>
          <mat-error *ngIf="form.get('value')?.hasError('required')">Value is required</mat-error>
          <mat-error *ngIf="form.get('value')?.hasError('invalidJson')">Invalid JSON format</mat-error>
        </mat-form-field>
      </div>
      <div class="form-actions">
        <button mat-raised-button type="submit" color="primary" [disabled]="form.invalid">Submit</button>
      </div>
    </form>
  `,
  styles: [`

    mat-form-field {
      width: 100%;
    }
  `]
})
export class ItemFormComponent {
  @Output() formSubmit = new EventEmitter<Item>();
  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      key: ['', Validators.required],
      value: ['', [Validators.required, jsonValidator]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const { key, value } = this.form.value;
      const jsonData = JSON.parse(value);
      this.formSubmit.emit({ key, value: jsonData });
    }
  }
}
