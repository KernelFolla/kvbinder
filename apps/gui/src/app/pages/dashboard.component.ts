import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '../components/navigation.component';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NavigationComponent, RouterTestingModule],
  template: `
    <h1>Dashboard</h1>
  `,
  styles: ``
})
export class DashboardComponent {
}
