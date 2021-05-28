import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectcLComponent } from './selectc-l.component';

describe('SelectcLComponent', () => {
  let component: SelectcLComponent;
  let fixture: ComponentFixture<SelectcLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectcLComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectcLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
