import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyistClientsComponent } from './lobbyist-clients.component';
import { AuthService, CommonMethods, ErrorMessageService, MasterDataService,MasterUrlService,LocalstorageService,SnackbarService } from 'src/app/core';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
describe('LobbyistClientsComponent', () => {
  let component: LobbyistClientsComponent;
  let fixture: ComponentFixture<LobbyistClientsComponent>;
  class MockRouterService {
    navigate() {}
  }
  const mockRouterService = new MockRouterService();
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
        MatTableModule,
        MatAutocompleteModule,
        MatDialogModule,
        MatSelectModule
      ],
      declarations: [ LobbyistClientsComponent ],
      providers:[CommonMethods,MasterDataService,ErrorMessageService,MasterUrlService,
        AuthService,{provide: Router, useValue: mockRouterService},LocalstorageService,
        SnackbarService,MatSnackBar,Overlay],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LobbyistClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('form invalid when empty', () => {
    component.LobbyClientsForm.controls.client.setValue('');
    component.LobbyClientsForm.controls.organisationName.setValue('');
    component.LobbyClientsForm.controls.lobbyist.setValue('');
    component.LobbyClientsForm.controls.BusinessName.setValue('');
    component.LobbyClientsForm.controls.remarks.setValue('');
    component.LobbyClientsForm.controls.address1.setValue('');
    component.LobbyClientsForm.controls.address2.setValue('');
    component.LobbyClientsForm.controls.zipcode.setValue('');
    component.LobbyClientsForm.controls.city.setValue('');
    component.LobbyClientsForm.controls.stateCode.setValue('');
    expect(component.LobbyClientsForm.valid).toBeFalsy();
  });

  test('form should be valid', () => {
    component.LobbyClientsForm.controls.client.setValue('');
    component.LobbyClientsForm.controls.organisationName.setValue('');
    component.LobbyClientsForm.controls.lobbyist.setValue('');
    component.LobbyClientsForm.controls.BusinessName.setValue('');
    component.LobbyClientsForm.controls.remarks.setValue('');
    component.LobbyClientsForm.controls.address1.setValue('');
    component.LobbyClientsForm.controls.address2.setValue('');
    component.LobbyClientsForm.controls.zipcode.setValue('');
    component.LobbyClientsForm.controls.city.setValue('');
    component.LobbyClientsForm.controls.stateCode.setValue('');
    expect(component.LobbyClientsForm.valid).toBeFalsy();
  });
});
