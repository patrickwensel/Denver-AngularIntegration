import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagecomponentComponent } from './messagecomponent.component';

describe('MessagecomponentComponent', () => {
  let component: MessagecomponentComponent;
  let fixture: ComponentFixture<MessagecomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagecomponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagecomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
