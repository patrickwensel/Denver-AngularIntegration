import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule } from '@angular/router';
import { AuthService, CommonMethods, ErrorMessageService, LocalstorageService, MasterDataService, MasterUrlService, SnackbarService } from 'src/app/core';

import { LobbyistEmployeesComponent } from './lobbyist-employees.component';

describe('LobbyistEmployeesComponent', () => {
  let component: LobbyistEmployeesComponent;
  let fixture: ComponentFixture<LobbyistEmployeesComponent>;
  class MockRouterService {
    navigate() {}
  }
  const mockRouterService = new MockRouterService();
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[MatTableModule,
        MatTabsModule,
        HttpClientModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        MatInputModule,
        MatAutocompleteModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatDialogModule
      ],
      declarations: [ LobbyistEmployeesComponent ],
      providers:[CommonMethods,MasterDataService,ErrorMessageService,{provide: Router, useValue: mockRouterService},
        MasterUrlService,AuthService,LocalstorageService,SnackbarService,MatSnackBar],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LobbyistEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('form invalid when empty', () => {
    component.LobbyEmployeesForm.controls.lobbyist.setValue('');
    component.LobbyEmployeesForm.controls.firstName.setValue('');
    component.LobbyEmployeesForm.controls.lastName.setValue('');
    component.LobbyEmployeesForm.controls.phone.setValue('');
    component.LobbyEmployeesForm.controls.email.setValue('');
    expect(component.LobbyEmployeesForm.valid).toBeFalsy();
  });

});
