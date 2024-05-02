import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BreakpointObserver } from '@angular/cdk/layout';
import { of } from 'rxjs';
import { NavigationComponent } from './navigation.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let breakpointObserver: BreakpointObserver;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationComponent, NoopAnimationsModule, MatSidenavModule, RouterModule.forRoot([])],
      providers: [
        {
          provide: BreakpointObserver,
          useValue: {
            observe: () => of({
              matches: false // not handset
            })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    breakpointObserver = TestBed.inject(BreakpointObserver);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have menu button for handset', () => {
    jest.spyOn(breakpointObserver, 'observe').mockReturnValue(of({
      breakpoints: {},
      matches: true
    })); // handset
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const menuButton = fixture.debugElement.query(By.css('button[aria-label="Toggle sidenav"]'));
      expect(menuButton).toBeTruthy();
    });
  });

  it('should not have menu button for web', () => {
    const menuButton = fixture.debugElement.query(By.css('button[aria-label="Toggle sidenav"]'));
    expect(menuButton).toBeNull();
  });

  it('should have navigation links', () => {
    const navLinks = fixture.debugElement.queryAll(By.css('a[mat-list-item]'));
    expect(navLinks.length).toBeGreaterThan(0);
  });
});
