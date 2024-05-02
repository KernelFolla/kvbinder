import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './components/navigation.component';

@Component({
  standalone: true,
  imports: [RouterModule, NavigationComponent],
  selector: 'app-root',
  template: `
    <app-navigation>
      <router-outlet></router-outlet>
    </app-navigation>
  `
})
export class AppComponent {
  title = 'gui';
}
