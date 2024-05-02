import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemExportComponent } from './item-export.component';
import { ItemService } from '@kvbinder/api-client-angular';
import { NgxBackButtonService } from 'ngx-back-button';
import { of } from 'rxjs';

describe('ItemExportComponent', () => {
  let component: ItemExportComponent;
  let fixture: ComponentFixture<ItemExportComponent>;
  let itemService: ItemService;
  let backButtonService: NgxBackButtonService;

  beforeEach(async () => {
    const itemServiceMock = {
      getItems: jest.fn().mockReturnValue(of([{ id: 1, name: 'Test Item' }]))
    };

    const backButtonServiceMock = {
      back: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [ItemExportComponent],
      providers: [
        { provide: ItemService, useValue: itemServiceMock },
        { provide: NgxBackButtonService, useValue: backButtonServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemExportComponent);
    component = fixture.componentInstance;
    itemService = TestBed.inject(ItemService);
    backButtonService = TestBed.inject(NgxBackButtonService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getItems on download', () => {
    const getItemsSpy = jest.spyOn(itemService, 'getItems');
    component.onDownload();
    expect(getItemsSpy).toHaveBeenCalled();
  });

  it('should call getItems on show', () => {
    const getItemsSpy = jest.spyOn(itemService, 'getItems');
    component.onShow();
    expect(getItemsSpy).toHaveBeenCalled();
  });

  it('should call back service on undo', () => {
    const backSpy = jest.spyOn(backButtonService, 'back');
    component.onUndo();
    expect(backSpy).toHaveBeenCalled();
  });
});
