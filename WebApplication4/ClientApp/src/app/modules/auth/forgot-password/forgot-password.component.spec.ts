import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule } from '@angular/router';
import { CommonMethods, ErrorMessageService, MasterDataService, MasterUrlService, SnackbarService ,AuthService,LocalstorageService} from 'src/app/core';
import { ClientService } from 'src/app/core/api-services/client.service';

import { ForgotPasswordComponent } from './forgot-password.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let formBuilderMock;
  let commonMethods: CommonMethods;
  let masterDate: MasterDataService;
  let errorService: ErrorMessageService;
  let snackbar: SnackbarService;
  let service: ClientService;
  let router: Router;
  let urlService: MasterUrlService;
  class MockRouterService {
    navigate() {}
  }
  const mockRouterService = new MockRouterService();
  component = new ForgotPasswordComponent(formBuilderMock,commonMethods,masterDate,
    errorService,snackbar,service,router,urlService);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      declarations: [ ForgotPasswordComponent ],
      providers:[CommonMethods,MasterDataService,ErrorMessageService,SnackbarService,MatSnackBar,Overlay,
        MasterUrlService,AuthService,{provide: Router, useValue: mockRouterService},
        LocalstorageService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('form invalid when empty', () => {
    component.frmForgot.controls.email.setValue('');
    expect(component.frmForgot.valid).toBeFalsy();
  });

  test('email field validity', () => {
    const mail = component.frmForgot.controls.email;
    expect(mail.valid).toBeFalsy();
    mail.setValue('');
    expect(mail.hasError('required')).toBeTruthy();
  });

  test('should set submitted to true', () => {
    component.resetLink();
    expect(component.frmForgot).toBeTruthy();
  });

  it ('should move to login page on button click', () => {
    spyOn(component.router, 'navigate').and.returnValue(true);
    component.goBack();
    expect(component.router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
