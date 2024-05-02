import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ItemDetailComponent } from './item-detail.component';
import { ItemService } from '@kvbinder/api-client-angular';
import { NgxBackButtonService } from 'ngx-back-button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ItemDetailComponent', () => {
  let component: ItemDetailComponent;
  let fixture: ComponentFixture<ItemDetailComponent>;
  let itemService: ItemService;
  let backButtonService: NgxBackButtonService;
  let snackBar: MatSnackBar;

  beforeEach(async () => {
    const itemServiceMock = {
      getItem: jest.fn().mockReturnValue(of({ x: 'testValue' })),
      updateItem: jest.fn().mockReturnValue(of(null)),
      deleteItem: jest.fn().mockReturnValue(of(null))
    };

    const backButtonServiceMock = {
      back: jest.fn()
    };

    const snackBarMock = {
      open: jest.fn()
    };

    const activatedRouteMock = {
      paramMap: of(new Map([['key', 'testKey']]))
    };

    await TestBed.configureTestingModule({
      imports: [ItemDetailComponent],
      providers: [
        { provide: ItemService, useValue: itemServiceMock },
        { provide: NgxBackButtonService, useValue: backButtonServiceMock },
        { provide: MatSnackBar, useValue: snackBarMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemDetailComponent);
    component = fixture.componentInstance;
    itemService = TestBed.inject(ItemService);
    backButtonService = TestBed.inject(NgxBackButtonService);
    snackBar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getItem on init', () => {
    const getItemSpy = jest.spyOn(itemService, 'getItem');
    component.ngOnInit();
    expect(getItemSpy).toHaveBeenCalledWith('testKey');
  });

  it('should call updateItem on edit submit', () => {
    const updateItemSpy = jest.spyOn(itemService, 'updateItem');
    component.onEditSubmit({ key: 'testKey', value: { x: 'testValue' } });
    expect(updateItemSpy).toHaveBeenCalledWith('testKey', { x: 'testValue' });
  });

  it('should call deleteItem on delete', () => {
    const deleteItemSpy = jest.spyOn(itemService, 'deleteItem');
    component.onDelete('testKey');
    expect(deleteItemSpy).toHaveBeenCalledWith('testKey');
  });

  it('should call back service on delete', () => {
    const backSpy = jest.spyOn(backButtonService, 'back');
    component.onDelete('testKey');
    expect(backSpy).toHaveBeenCalled();
  });

  it('should disable edit on edit undo', () => {
    component.isEditing = true;
    component.onEditUndo();
    expect(component.isEditing).toBeFalsy();
  });
});
