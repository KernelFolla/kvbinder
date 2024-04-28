import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemFormComponent } from '../components/item-form.component';
import { NavigationComponent } from '../components/navigation.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ItemFormComponent, NavigationComponent],
  template: `
    <app-navigation>
      <h1>Dashboard</h1>
    </app-navigation>
  `,
  styles: ``
})
export class DashboardComponent {
}
