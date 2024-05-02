import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';

@Component({ selector: 'app-blank-cmp', template: '<h1>Hello</h1>' })
class BlankComponent {

}


describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent,
        RouterModule.forRoot(
          [{ path: '', component: BlankComponent }]
        )]
    }).compileComponents();
  });

  it('should render router-outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.outerHTML).toContain('<router-outlet></router-outlet>');
  });

  it(`should have as title 'KVBinder'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('gui');
  });
});
