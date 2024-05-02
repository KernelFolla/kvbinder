import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemListComponent } from './item-list.component';
import { ItemService } from '@kvbinder/api-client-angular';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('ItemListComponent', () => {
  let component: ItemListComponent;
  let fixture: ComponentFixture<ItemListComponent>;
  let itemService: ItemService;

  beforeEach(async () => {
    const itemServiceMock = {
      getKeys: jest.fn().mockReturnValue(of(['item1', 'item2', 'item3']))
    };

    await TestBed.configureTestingModule({
      imports: [ItemListComponent, RouterTestingModule],
      providers: [
        { provide: ItemService, useValue: itemServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemListComponent);
    component = fixture.componentInstance;
    itemService = TestBed.inject(ItemService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getKeys on component creation', () => {
    const getKeysSpy = jest.spyOn(itemService, 'getKeys');
    expect(getKeysSpy).toHaveBeenCalled();
  });

  it('should display items', (done) => {
    component.items$.subscribe(items => {
      expect(items).toEqual(['item1', 'item2', 'item3']);
      done();
    });
  });
});
