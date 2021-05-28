import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule } from '@angular/router';
import { AuthService, CommonMethods, ErrorMessageService, LocalstorageService, MasterDataService, MasterUrlService, SnackbarService } from 'src/app/core';
import { ClientService } from 'src/app/core/api-services/client.service';

import { LoginComponent } from './login.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let formBuilderMock;
  let commonMock;
  let masterDate: MasterDataService;
  let errorService: ErrorMessageService;
  let dialog: MatDialog;
  let router: Router;
  let urlService: MasterUrlService;
  let service: ClientService;
  let snackbar: SnackbarService;
  let localStore: LocalstorageService;
  class MockRouterService {
    navigate() {}
  }
  const mockRouterService = new MockRouterService();
  component = new LoginComponent(formBuilderMock,commonMock,masterDate,errorService,dialog,router,urlService,service,snackbar,localStore);
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
        MatIconModule,
        MatDialogModule
      ],
      declarations: [ LoginComponent ],
      providers:[CommonMethods,MasterDataService,ErrorMessageService,{provide: Router, useValue: mockRouterService},
        MasterUrlService,AuthService,LocalstorageService,SnackbarService,MatSnackBar],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('form invalid when empty', () => {
    component.frmLogin.controls.email.setValue('');
    component.frmLogin.controls.password.setValue('');
    expect(component.frmLogin.valid).toBeFalsy();
  });

  test('email field validity', () => {
    const mail = component.frmLogin.controls.email;
    expect(mail.valid).toBeFalsy();
    mail.setValue('');
    expect(mail.hasError('required')).toBeTruthy();
  });

  test('password field validity', () => {
    const pwd = component.frmLogin.controls.password;
    expect(pwd.valid).toBeFalsy();
    pwd.setValue('');
    expect(pwd.hasError('required')).toBeTruthy();
  });



  test('should call onLogin method when clicked', () => {
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    expect(component.submitted).toBeTruthy();
  });

  test('form should be valid', () => {
    component.frmLogin.controls.email.setValue('test.user@yopmail.com');
    component.frmLogin.controls.password.setValue('Password@123');
    expect(component.frmLogin.valid).toBeTruthy();
  });

  it ('should move to create account page on button click', () => {
    spyOn(component.router, 'navigate').and.returnValue(true);
    component.routeToAccount();
    expect(component.router.navigate).toHaveBeenCalledWith(['/createaccount']);
});

it ('should move to create forget password page on button click', () => {
  spyOn(component.router, 'navigate').and.returnValue(true);
  component.gotoForgot();
  expect(component.router.navigate).toHaveBeenCalledWith(['/forgotpassword']);
});

});
