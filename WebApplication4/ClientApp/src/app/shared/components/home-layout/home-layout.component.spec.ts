import { Overlay } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, ChildrenOutletContexts, Router, RouterModule } from '@angular/router';
import { AuthService, CommonMethods, ErrorMessageService, LocalstorageService, MasterDataService, MasterUrlService, SnackbarService } from 'src/app/core';

import { HomeLayoutComponent } from './home-layout.component';

describe('HomeLayoutComponent', () => {
  let component: HomeLayoutComponent;
  let fixture: ComponentFixture<HomeLayoutComponent>;
  class MockRouterService {
    navigate() {}
  }
  const mockRouterService = new MockRouterService();
  let activatedRouterMock;
  let masterData: MasterDataService;
  let localStore: LocalstorageService;
  let commonMethods: CommonMethods;
  let router: Router;
  let errorService: ErrorMessageService;
  let snackbar: SnackbarService;
  component = new HomeLayoutComponent(masterData,localStore,commonMethods,router,errorService,snackbar);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatSelectModule,
        MatToolbarModule,
        MatSnackBarModule
      ],
      declarations: [ HomeLayoutComponent ],
      providers:[CommonMethods,MasterDataService,ErrorMessageService,{provide: Router, useValue: mockRouterService},
        MasterUrlService,AuthService,LocalstorageService,SnackbarService,MatSnackBar,{provide: MatDialogRef, useValue: {}},
        Overlay,{ provide: ActivatedRoute, useFactory: () => activatedRouterMock},{ provide: MAT_DIALOG_DATA, useValue: {} },
        ChildrenOutletContexts],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('logout should happen and move to login', () => {
    spyOn(component.router, 'navigate').and.returnValue(true);
    component.logout();
    expect(component.router.navigate).toHaveBeenCalledWith(['/login']);
});

});
