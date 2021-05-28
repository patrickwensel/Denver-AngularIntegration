import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonMethods, ErrorMessageService, LocalstorageService, MasterDataService, MasterUrlService, SnackbarService,AuthService } from 'src/app/core';
import { ClientService } from 'src/app/core/api-services/client.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule } from '@angular/router';
import { CreateAccountComponent } from './create-account.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';

describe('CreateAccountComponent', () => {
  let component: CreateAccountComponent;
  let fixture: ComponentFixture<CreateAccountComponent>;
  let commonMethods: CommonMethods;
  let masterDate: MasterDataService;
  let urlService: MasterUrlService;
  let errorService: ErrorMessageService;
  let formBuilderMock
  let service: ClientService;
  let router: Router;
  let snackbar: SnackbarService;
  let localStore: LocalstorageService;
  class MockRouterService {
    navigate() {}
  }
  const mockRouterService = new MockRouterService();
  component = new CreateAccountComponent(commonMethods,masterDate,urlService,errorService,
    formBuilderMock,service,router,snackbar,localStore);
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
      ],
      declarations: [ CreateAccountComponent ],
      providers:[CommonMethods,MasterDataService,MasterUrlService,ErrorMessageService,
        AuthService,{provide: Router, useValue: mockRouterService},LocalstorageService,
        SnackbarService,MatSnackBar,Overlay],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('Create info form invalid when empty', () => {
    component.createInformationForm.controls.firstName.setValue('');
    component.createInformationForm.controls.lastName.setValue('');
    component.createInformationForm.controls.mailingAdd1.setValue('');
    component.createInformationForm.controls.mailingAdd2.setValue('');
    component.createInformationForm.controls.phone.setValue('');
    component.createInformationForm.controls.zipcode.setValue('');
    component.createInformationForm.controls.city.setValue('');
    component.createInformationForm.controls.state.setValue('');
    component.createInformationForm.controls.email.setValue('');
    expect(component.createInformationForm.valid).toBeTruthy();
  });


  it ('should move to login page on button click', () => {
    spyOn(component.router, 'navigate').and.returnValue(true);
    component.back();
    expect(component.router.navigate).toHaveBeenCalledWith(['/login']);
  });

});
