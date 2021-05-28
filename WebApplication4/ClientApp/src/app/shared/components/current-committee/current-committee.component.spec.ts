import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentCommitteeComponent } from './current-committee.component';

describe('CurrentCommitteeComponent', () => {
  let component: CurrentCommitteeComponent;
  let fixture: ComponentFixture<CurrentCommitteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentCommitteeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentCommitteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
