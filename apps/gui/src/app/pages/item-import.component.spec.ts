import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemImportComponent } from './item-import.component';
import { ItemService } from '@kvbinder/api-client-angular';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxBackButtonService } from 'ngx-back-button';
import { of } from 'rxjs';

describe('ItemImportComponent', () => {
  let component: ItemImportComponent;
  let fixture: ComponentFixture<ItemImportComponent>;
  let itemService: ItemService;
  let backButtonService: NgxBackButtonService;
  let snackBar: MatSnackBar;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    const itemServiceMock = {
      importItems: jest.fn().mockReturnValue(of(null))
    };

    const backButtonServiceMock = {
      back: jest.fn()
    };

    const snackBarMock = {
      open: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [ItemImportComponent],
      providers: [
        { provide: ItemService, useValue: itemServiceMock },
        { provide: NgxBackButtonService, useValue: backButtonServiceMock },
        { provide: MatSnackBar, useValue: snackBarMock },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemImportComponent);
    component = fixture.componentInstance;
    itemService = TestBed.inject(ItemService);
    backButtonService = TestBed.inject(NgxBackButtonService);
    snackBar = TestBed.inject(MatSnackBar);
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call importItems on submit', () => {
    const importItemsSpy = jest.spyOn(itemService, 'importItems');
    component.submit([{ key: 'test', value: { x: 'value' } }]);
    expect(importItemsSpy).toHaveBeenCalled();
  });

  it('should call back service on undo', () => {
    const backSpy = jest.spyOn(backButtonService, 'back');
    component.onUndo();
    expect(backSpy).toHaveBeenCalled();
  });

  it('should open snackBar on submit', () => {
    const snackBarSpy = jest.spyOn(snackBar, 'open');
    component.submit([{ key: 'test', value: { x: 'value' } }]);
    expect(snackBarSpy).toHaveBeenCalled();
  });
});
