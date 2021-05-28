import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CommonMethods, MasterDataService, ErrorMessageService, MasterUrlService, AuthService, LocalstorageService, SnackbarService } from 'src/app/core';

import { ResetPasswordComponent } from './reset-password.component';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  class MockRouterService {
    navigate() {}
  }
  const mockRouterService = new MockRouterService();
  let activatedRouterMock;
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
      declarations: [ ResetPasswordComponent ],
      providers:[CommonMethods,MasterDataService,ErrorMessageService,{provide: Router, useValue: mockRouterService},
        MasterUrlService,AuthService,LocalstorageService,SnackbarService,MatSnackBar,
        { provide: ActivatedRoute, useFactory: () => activatedRouterMock}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('form invalid when empty', () => {
    component.frmresetpwd.controls.newpassword.setValue('');
    component.frmresetpwd.controls.confirmpassword.setValue('');
    expect(component.frmresetpwd.valid).toBeFalsy();
  });

  test('password field validity', () => {
    const mail = component.frmresetpwd.controls.newpassword;
    expect(mail.valid).toBeFalsy();
    mail.setValue('');
    expect(mail.hasError('required')).toBeTruthy();
  });

  test('Confitm password field validity', () => {
    const mail = component.frmresetpwd.controls.confirmpassword;
    expect(mail.valid).toBeFalsy();
    mail.setValue('');
    expect(mail.hasError('required')).toBeTruthy();
  });


  test('should call resetPassword method when clicked', () => {
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    expect(component.submitted).toBeTruthy();
  });

  test('form should be valid', () => {
    component.frmresetpwd.controls.newpassword.setValue('Augusta@12');
    component.frmresetpwd.controls.confirmpassword.setValue('Augusta@12');
    expect(component.frmresetpwd.valid).toBeTruthy();
  });
});
