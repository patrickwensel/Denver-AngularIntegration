import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonMethods, ErrorMessageService, MasterUrlService } from 'src/app/core';
import { ClientService } from 'src/app/core/api-services/client.service';
import { MasterDataService } from "./../../../configs/master-data";




@Component({
  selector: 'app-lobbyist-registration',
  templateUrl: './lobbyist-registration.component.html',
  styleUrls: ['./lobbyist-registration.component.scss']
})
export class LobbyistRegistrationComponent implements OnInit {
  @Output() LobbyRegistration = new EventEmitter<Object>();
  @Input() LobbyRegistrationDate:any = {}
  static_data: any;
  LobbyRegisterForm: FormGroup;
  lobbyRegisForm:any;
  hideRequiredMarker: boolean = true;
  stateList:any;
  LobbyType:any;
  dateNow : Date = new Date();
  currentYear = this.dateNow.getFullYear();
  firmView =false;
  value:any;

  constructor( private commonMethods: CommonMethods,
    public masterDate: MasterDataService,
    public errorService: ErrorMessageService,
    private service: ClientService,
    public router: Router,
    private urlService: MasterUrlService){

  }
  ngOnInit()
  {
    this.commonMethods.setCurrentLanguage();
    this.static_data = this.commonMethods.getCurrentLanguage();
    this.initCreateForm(this.LobbyRegistrationDate);
    this.getStateList();
    this.getLobbyType();
  }

  getStateList (){

    this.stateList =[];
    this.service.getData(this.urlService.getStatelist).subscribe((res: any) => {
      this.stateList = res;
      console.log(res);
    })
  }
  // getLobbyType(){
  //   this.service.postData(this.urlService.lookupGetList,{"lookUpType": "LOB"}).subscribe((res: any) => {
  //     this.LobbyType = res;
  //    })
  //     }

      getLobbyType (){
        this.LobbyType =[];
        this.service.postData(this.urlService.lookupGetList,{ "lookUpType": "FILER-TYPE"}).subscribe((res: any) => {
          this.LobbyType = res;
          console.log(res);
        })
      }


  initCreateForm(LobbyRegistrationDate:any) {
    this.LobbyRegisterForm = new FormGroup({
      year: new FormControl(LobbyRegistrationDate.year || this.currentYear,
        [Validators.maxLength(4), Validators.minLength(4),Validators.min(0),Validators.max(this.currentYear)]),
      lobbyType: new FormControl(LobbyRegistrationDate.type || null,
        [Validators.required]),
      firstName: new FormControl(LobbyRegistrationDate.firstName || null,
        [Validators.minLength(2), Validators.maxLength(80)]),
      lastName: new FormControl(LobbyRegistrationDate.lastName || null,
        [Validators.minLength(2), Validators.maxLength(80)]),
      firmName: new FormControl(LobbyRegistrationDate.organisationName || null, [Validators.required]),
      address1: new FormControl(LobbyRegistrationDate.address1 || null,
        [Validators.minLength(2), Validators.maxLength(150), Validators.pattern(this.masterDate.addressPattern)]),
      address2: new FormControl(LobbyRegistrationDate.address2 || null,
        [Validators.minLength(2), Validators.maxLength(150)]),
      phone: new FormControl(LobbyRegistrationDate.phone || null,
        [Validators.maxLength(10)]),
      zipcode: new FormControl(LobbyRegistrationDate.zipCode || null, [Validators.required]),
      city: new FormControl(LobbyRegistrationDate.city|| null, [Validators.required]),
      state: new FormControl(LobbyRegistrationDate.stateCode || null, [Validators.required]),
      email: new FormControl(LobbyRegistrationDate.email || null,
        [Validators.pattern(this.masterDate.emailValidations)])

    });
    // if(this.LobbyType.value == "Individual"){
    //   this.firmView = false;
    // }
    // else{
    //   this.firmView=true;
    // }
  }

  ValidateLobbyistRegister(){
    if (this.LobbyRegisterForm.valid) {
      this.lobbyRegisForm = this.LobbyRegisterForm.value;
     console.log(JSON.stringify(this.lobbyRegisForm));
     this.LobbyRegistration.emit(this.lobbyRegisForm)
   }
   else {
     this.LobbyRegisterForm.markAllAsTouched();
   }
 }
 navigate(){
   this.router.navigate(['/login'])
 }
 valueChange(value:any) {
  if(this.value=="Individual"){
   this.firmView=true
  }
  else{
    this.firmView=false
  }
}

  }


