import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemFormComponent } from './item-form.component';
import { By } from '@angular/platform-browser';

describe('ItemFormComponent', () => {
  let component: ItemFormComponent;
  let fixture: ComponentFixture<ItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ItemFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit formSubmit event on valid form submission', () => {
    const formSubmitSpy = jest.spyOn(component.formSubmit, 'emit');
    component.form.controls['key'].setValue('testKey');
    component.form.controls['value'].setValue('{"test": "value"}');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.debugElement.query(By.css('button[type=submit]')).nativeElement.click();
      expect(formSubmitSpy).toHaveBeenCalledWith({ key: 'testKey', value: { test: 'value' } });
    });
  });

  it('should not emit formSubmit event on invalid form submission', () => {
    const formSubmitSpy = jest.spyOn(component.formSubmit, 'emit');
    component.form.controls['key'].setValue('');
    component.form.controls['value'].setValue('invalid json');
    fixture.debugElement.query(By.css('button[type=submit]')).nativeElement.click();
    expect(formSubmitSpy).not.toHaveBeenCalled();
  });

  it('should emit undo event on undo button click', () => {
    const undoSpy = jest.spyOn(component.undo, 'emit');
    fixture.debugElement.query(By.css('button[aria-label="Undo"]')).nativeElement.click();
    expect(undoSpy).toHaveBeenCalled();
  });
});
