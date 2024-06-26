import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ItemCreateComponent } from './item-create.component';
import { ItemService } from '@kvbinder/api-client-angular';
import { of } from 'rxjs';
import { NgxBackButtonService } from 'ngx-back-button';

describe('ItemCreateComponent', () => {
  let component: ItemCreateComponent;
  let fixture: ComponentFixture<ItemCreateComponent>;
  let itemService: ItemService;
  let backButtonService: NgxBackButtonService;

  beforeEach(async () => {
    const itemServiceMock = {
      updateItem: jest.fn().mockReturnValue(of(null))
    };

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatSnackBarModule,
        ItemCreateComponent
      ],
      declarations: [],
      providers: [
        { provide: ItemService, useValue: itemServiceMock },
        { provide: NgxBackButtonService, useValue: { back: jest.fn() } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemCreateComponent);
    component = fixture.componentInstance;
    itemService = TestBed.inject(ItemService);
    backButtonService = TestBed.inject(NgxBackButtonService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateItem on form submit', () => {
    const updateItemSpy = jest.spyOn(itemService, 'updateItem');
    component.onSubmit({ key: 'testKey', value: { x: 'testValue' } });
    expect(updateItemSpy).toHaveBeenCalledWith('testKey', { x: 'testValue' });
  });

  it('should call back service on undo', () => {
    const backSpy = jest.spyOn(backButtonService, 'back');
    component.onUndo();
    expect(backSpy).toHaveBeenCalled();
  });
});
