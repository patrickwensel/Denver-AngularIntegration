import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarycomponentComponent } from './summarycomponent.component';

describe('SummarycomponentComponent', () => {
  let component: SummarycomponentComponent;
  let fixture: ComponentFixture<SummarycomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummarycomponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummarycomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
