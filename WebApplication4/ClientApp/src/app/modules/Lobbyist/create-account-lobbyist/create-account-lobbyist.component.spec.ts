import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material/tabs';

import { CreateAccountLobbyistComponent } from './create-account-lobbyist.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService, CommonMethods, ErrorMessageService, MasterDataService,MasterUrlService,LocalstorageService,SnackbarService } from 'src/app/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';

describe('CreateAccountLobbyistComponent', () => {
  let component: CreateAccountLobbyistComponent;
  let fixture: ComponentFixture<CreateAccountLobbyistComponent>;
  class MockRouterService {
    navigate() {}
  }
  const mockRouterService = new MockRouterService();
  let activatedRouterMock;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        MatTabsModule,
        HttpClientModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      declarations: [ CreateAccountLobbyistComponent ],
      providers:[CommonMethods,MasterDataService,ErrorMessageService,MasterUrlService,
        AuthService,{provide: Router, useValue: mockRouterService},LocalstorageService,
        SnackbarService,MatSnackBar,Overlay,{ provide: ActivatedRoute, useFactory: () => activatedRouterMock}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountLobbyistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
