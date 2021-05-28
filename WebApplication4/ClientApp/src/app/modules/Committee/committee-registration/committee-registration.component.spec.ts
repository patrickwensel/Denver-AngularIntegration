import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonMethods, ErrorMessageService, MasterDataService, MasterUrlService, SnackbarService,AuthService, LocalstorageService } from 'src/app/core';
import { CommitteeRegistrationComponent } from './committee-registration.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';

describe('CommitteeRegistrationComponent', () => {
  let component: CommitteeRegistrationComponent;
  let fixture: ComponentFixture<CommitteeRegistrationComponent>;
  class MockRouterService {
    navigate() {}
  }
  const mockRouterService = new MockRouterService();
  let activatedRouterMock;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatTabsModule
      ],
      declarations: [ CommitteeRegistrationComponent ],
      providers:[CommonMethods,MasterDataService,ErrorMessageService,
        {provide: Router, useValue: mockRouterService},
        { provide: ActivatedRoute, useFactory: () => activatedRouterMock},MasterUrlService,AuthService,SnackbarService,
        LocalstorageService,MatSnackBar,Overlay],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitteeRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
