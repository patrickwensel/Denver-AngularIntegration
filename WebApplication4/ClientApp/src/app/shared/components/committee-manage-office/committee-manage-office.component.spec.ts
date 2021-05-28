import { Overlay } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService, CommonMethods, ErrorMessageService, LocalstorageService, MasterDataService, MasterUrlService, SnackbarService } from 'src/app/core';

import { CommitteeManageOfficeComponent } from './committee-manage-office.component';

describe('CommitteeManageOfficeComponent', () => {
  let component: CommitteeManageOfficeComponent;
  let fixture: ComponentFixture<CommitteeManageOfficeComponent>;
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
        MatSelectModule,
        MatTableModule,
        MatAutocompleteModule,
        MatDialogModule
      ],
      declarations: [CommitteeManageOfficeComponent],
      providers:[CommonMethods,MasterDataService,ErrorMessageService,{provide: Router, useValue: mockRouterService},
        MasterUrlService,AuthService,LocalstorageService,SnackbarService,MatSnackBar,{provide: MatDialogRef, useValue: {}},
        Overlay,{ provide: ActivatedRoute, useFactory: () => activatedRouterMock}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitteeManageOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('form invalid when empty', () => {
    component.addCommitteeOfficerForm.controls.type.setValue('');
    component.addCommitteeOfficerForm.controls.firstName.setValue('');
    component.addCommitteeOfficerForm.controls.lastName.setValue('');
    component.addCommitteeOfficerForm.controls.phone.setValue('');
    component.addCommitteeOfficerForm.controls.email.setValue('');
    component.addCommitteeOfficerForm.controls.address1.setValue('');
    component.addCommitteeOfficerForm.controls.address2.setValue('');
    component.addCommitteeOfficerForm.controls.city.setValue('');
    component.addCommitteeOfficerForm.controls.state.setValue('');
    component.addCommitteeOfficerForm.controls.zipcode.setValue('');
    component.addCommitteeOfficerForm.controls.description.setValue('');
    component.addCommitteeOfficerForm.controls.officerType.setValue('');
    expect(component.addCommitteeOfficerForm.valid).toBeFalsy();
  });

});
