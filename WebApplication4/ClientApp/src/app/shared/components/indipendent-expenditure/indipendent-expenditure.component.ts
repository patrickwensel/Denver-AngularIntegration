import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonMethods, MasterDataService, MasterUrlService, ErrorMessageService, SnackbarService, LocalstorageService } from 'src/app/core';
import { ClientService } from 'src/app/core/api-services/client.service';
@Component({
  selector: 'app-indipendent-expenditure',
  templateUrl: './indipendent-expenditure.component.html',
  styleUrls: ['./indipendent-expenditure.component.scss']
})
export class IndipendentExpenditureComponent implements OnInit {
  static_data: any = {};
  hideRequiredMarker: boolean = true;
  independentExpenditureForm: FormGroup;
  @Output() IEFormEmit = new EventEmitter<Object>();
  @Output() IEgoBackEmit = new EventEmitter<Object>();
  filerTypes: any;
  // filerRole: any = 'FT-IND';
  filerRole: any;

  constructor(
    private commonMethods: CommonMethods,
    public masterDate: MasterDataService,
    private urlService: MasterUrlService,
    public errorService: ErrorMessageService,
    private fb: FormBuilder,
    private service: ClientService,
    public router: Router,
    public snackbar: SnackbarService,
    private localStore: LocalstorageService,
  ) { }

  ngOnInit(): void {
    this.commonMethods.setCurrentLanguage();
    this.static_data = this.commonMethods.getCurrentLanguage();
    this.independentExpenditureFilerForm();
    this.getFiler();
  }

  independentExpenditureFilerForm() {
    // this.filerRole == 'FT-IND';
    this.independentExpenditureForm = this.fb.group({
      filerType: ["", [Validators.required]],
      occupation: ["", []],
      employer: ["", []],
    });
  }

  getFiler() {
    const user = {
      lookUpType: "FILER-TYPE",
    };
    this.service
      .postData(this.urlService.getList, user)
      .subscribe((res: any) => {
        console.log(res);
        this.filerTypes = res;
        // this.independentExpenditureForm.patchValue({
        //   filerType: this.filerTypes[1].lookUpTypeId})
      });
  }

  changevalue() {
    this.filerRole = this.independentExpenditureForm.value.filerType;
  }

  SendNewIEDetail() {
    this.independentExpenditureForm.markAllAsTouched();

    if (this.independentExpenditureForm.invalid) {
      return this.snackbar.snackbarError('please fill out the required field', this.masterDate.centre)
    }

    this.IEFormEmit.emit(this.independentExpenditureForm.value)
  }

  Sendback() {
    this.IEgoBackEmit.emit();
  }

}
