import { Component, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ItemService } from '@kvbinder/api-client-angular';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [CommonModule],
  template: `<p>item-detail works!</p>`,
  styles: ``,
})
export class ItemDetailComponent {
  key?: string;
  item$: Observable<unknown>;
  constructor(private route: ActivatedRoute, private api: ItemService) {
    this.item$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.key = params.get('key') || undefined
        if(!this.key) throw new Error('No key provided');
        return this.api.getItem(this.key);
      })
    );
  }
}
