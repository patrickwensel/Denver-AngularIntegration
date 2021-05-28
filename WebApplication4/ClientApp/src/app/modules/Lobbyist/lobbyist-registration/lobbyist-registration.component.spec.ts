import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule } from '@angular/router';

import { LobbyistRegistrationComponent } from './lobbyist-registration.component';
import { AuthService, CommonMethods, ErrorMessageService, LocalstorageService, MasterDataService, MasterUrlService, SnackbarService } from 'src/app/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';

describe('LobbyistRegistrationComponent', () => {
  let component: LobbyistRegistrationComponent;
  let fixture: ComponentFixture<LobbyistRegistrationComponent>;
  class MockRouterService {
    navigate() {}
  }
  const mockRouterService = new MockRouterService();
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
        MatTableModule,
        MatAutocompleteModule,
        MatTabsModule,
        MatDialogModule,
        MatSelectModule
      ],
      declarations: [ LobbyistRegistrationComponent ],
      providers:[CommonMethods,MasterDataService,ErrorMessageService,{provide: Router, useValue: mockRouterService},
        MasterUrlService,AuthService,LocalstorageService,SnackbarService,MatSnackBar],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LobbyistRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('form invalid when empty', () => {
    component.LobbyRegisterForm.controls.year.setValue('');
    component.LobbyRegisterForm.controls.lobbyType.setValue('');
    component.LobbyRegisterForm.controls.firstName.setValue('');
    component.LobbyRegisterForm.controls.lastName.setValue('');
    component.LobbyRegisterForm.controls.firmName.setValue('');
    component.LobbyRegisterForm.controls.address1.setValue('');
    component.LobbyRegisterForm.controls.address2.setValue('');
    component.LobbyRegisterForm.controls.phone.setValue('');
    component.LobbyRegisterForm.controls.zipcode.setValue('');
    component.LobbyRegisterForm.controls.city.setValue('');
    component.LobbyRegisterForm.controls.state.setValue('');
    component.LobbyRegisterForm.controls.email.setValue('');
    expect(component.LobbyRegisterForm.valid).toBeFalsy();
  });

  it ('should move to login page on button click', () => {
    spyOn(component.router, 'navigate').and.returnValue(true);
    component.navigate();
    expect(component.router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
