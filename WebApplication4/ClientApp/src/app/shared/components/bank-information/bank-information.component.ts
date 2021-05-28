import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonMethods, ErrorMessageService, MasterDataService, MasterUrlService } from 'src/app/core';
import { ClientService } from 'src/app/core/api-services/client.service';

@Component({
  selector: 'app-bank-information',
  templateUrl: './bank-information.component.html',
  styleUrls: ['./bank-information.component.scss']
})
export class BankInformationComponent implements OnInit {

  hideRequiredMarker:boolean = true;
  @Output() bankEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() backBtnEmiter = new EventEmitter<Object>();
  bankForm: FormGroup;
  static_data: any;
  bankFormValue:any;
  stateList : any =[];

  constructor(
    private commonMethods: CommonMethods,
    public masterDate: MasterDataService,
    public errorService: ErrorMessageService,
    private urlService: MasterUrlService,
    private service: ClientService,
  ) { }

  ngOnInit(): void {
    this.commonMethods.setCurrentLanguage();
    this.static_data = this.commonMethods.getCurrentLanguage();
    this.bankInformationForm();
    this.getStateList();
  }
  bankInformationForm () {
    this.bankForm = new FormGroup({
        bankName: new FormControl("" || null,[Validators.maxLength(120), Validators.pattern(this.masterDate.onlyAlphaNumber), Validators.required]),
        address1: new FormControl("" || null,
        [Validators.minLength(1), Validators.maxLength(150),Validators.pattern(this.masterDate.addressPattern)]),
        address2: new FormControl("" || null,
        [Validators.minLength(1), Validators.maxLength(150),Validators.pattern(this.masterDate.addressPattern)]),
        city: new FormControl("" || null,[Validators.required]),
        state: new FormControl("" || null,[Validators.required]),
        zipcode: new FormControl("" || null,[Validators.maxLength(5),Validators.required]),
    });
  }

  getStateList (){
    this.stateList =[];
    this.service.getData(this.urlService.getStatelist).subscribe((res: any) => {
      this.stateList = res;
    })
  }


  submitBankForm(){
    if (this.bankForm.valid) {
      this.bankFormValue = this.bankForm.value;
     console.log(JSON.stringify(this.bankFormValue));
     this.bankEmitter.emit(this.bankFormValue)
   }
   else {
     this.bankForm.markAllAsTouched();
   }
  }
  goBack(){
    this.backBtnEmiter.emit(3)
  }

}
