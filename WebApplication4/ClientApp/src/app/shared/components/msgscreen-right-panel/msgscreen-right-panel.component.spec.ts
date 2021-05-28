import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgscreenRightPanelComponent } from './msgscreen-right-panel.component';

describe('MsgscreenRightPanelComponent', () => {
  let component: MsgscreenRightPanelComponent;
  let fixture: ComponentFixture<MsgscreenRightPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsgscreenRightPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsgscreenRightPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
