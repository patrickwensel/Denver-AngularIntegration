import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import {
  CommonMethods,
  ErrorMessageService,
  LocalstorageService,
  MasterDataService,
  MasterUrlService,
  SnackbarService,
} from 'src/app/core';
import { ClientService } from 'src/app/core/api-services/client.service';

@Component({
  selector: 'app-create-account-lobbyist',
  templateUrl: './create-account-lobbyist.component.html',
  styleUrls: ['./create-account-lobbyist.component.scss'],
})
export class CreateAccountLobbyistComponent implements OnInit {
  showInformation: boolean = true;
  showPassword = false;
  showcommitee = false;
  showUsertype = false;
  static_data: any;
  selectIndex: any = 0;
  lobbyRegisData: any;
  confirm:boolean = false;
  lobbyist = 'lobbyist';
  lN:any;
  fN:any;
  LobbyRegistrationDate = {
    "lobbyistID": 0,
    "firstName": '',
    "lastName": '',
    "email": '',
    "organisationName": '',
    "address1": '',
    "address2": '',
    "city": '',
    "stateCode": '',
    "zipCode": '',
    "phone": '',
    "imageURL": '',
    "type": '',
    "year": 0,
    "userID": 0,
    "employeeInfo": [
      // {
      //   "tenantId": 0,
      //   "createdBy": '',
      //   "createdAt": '',
      //   "updatedBy": '',
      //   "updatedOn": '',
      //   "userId": 0,
      //   "title": '',
      //   "firstName": '',
      //   "lastName": '',
      //   "address1": '',
      //   "address2": '',
      //   "city": '',
      //   "stateCode": '',
      //   "zipcode": '',
      //   "countryCode": '',
      //   "email": '',
      //   "phone": '',
      //   "lobbyistId": 0,
      // },
    ],
    "subContractorInfo": [
      // {
      //   "tenantId": 0,
      //   "createdBy": '',
      //   "createdAt": '',
      //   "updatedBy": '',
      //   "updatedOn": '',
      //   "userId": 0,
      //   "title": '',
      //   "firstName": '',
      //   "lastName": '',
      //   "address1": '',
      //   "address2": '',
      //   "city": '',
      //   "stateCode": '',
      //   "zipcode": '',
      //   "countryCode": '',
      //   "email": '',
      //   "phone": '',
      //   "lobbyistId": 0,
      // },
    ],
    "clientInfo": [
      // {
      //   "tenantId": 0,
      //   "createdBy": '',
      //   "createdAt": '',
      //   "updatedBy": '',
      //   "updatedOn": '',
      //   "userId": 0,
      //   "title": '',
      //   "firstName": '',
      //   "lastName": '',
      //   "address1": '',
      //   "address2": '',
      //   "city": '',
      //   "stateCode": '',
      //   "zipcode": '',
      //   "countryCode": '',
      //   "email": '',
      //   "phone": '',
      //   "notifyEmailSentOn": '',
      //   "notifyAcceptedOn": '',
      //   "isNotifyAccepted": true,
      //   "userName": '',
      //   "userPassword": '',
      //   "salt": '',
      //   "organisationName": '',
      //   "businessName": '',
      //   "occupation": '',
      //   "voterId": '',
      //   "remarks": '',
      //   "lobbyistId": 0,
      // },
    ],
    "relationship": [
      // {
      //   "tenantId": 0,
      //   "createdBy": '',
      //   "createdAt": '',
      //   "updatedBy": '',
      //   "updatedOn": '',
      //   "userId": 0,
      //   "title": '',
      //   "firstName": '',
      //   "lastName": '',
      //   "address1": '',
      //   "address2": '',
      //   "city": '',
      //   "stateCode": '',
      //   "zipcode": '',
      //   "countryCode": '',
      //   "email": '',
      //   "phone": '',
      //   "notifyEmailSentOn": '',
      //   "notifyAcceptedOn": '',
      //   "isNotifyAccepted": true,
      //   "userName": '',
      //   "userPassword": '',
      //   "salt": '',
      //   "organisationName": '',
      //   "businessName": '',
      //   "occupation": '',
      //   "voterId": '',
      //   "remarks": '',
      //   "lobbyistId": 0,
      // },
    ],
    "signature": '',
}
  fullName: any = '';
  userId: any = 0 ;

  constructor(
    private commonMethods: CommonMethods,
    public masterDate: MasterDataService,
    public errorService: ErrorMessageService,
    private service: ClientService,
    private urlService: MasterUrlService,
    public snackbar: SnackbarService,
    private localStore: LocalstorageService,
    public route : ActivatedRoute,
  ) {
        this.fN =localStorage.getItem('firstName');
        this.lN =localStorage.getItem('lastName');
        if(this.fN || this.lN){
        this.fullName = (this.fN + this.lN).replace(/"/g, " ");
        console.log(this.fullName)
        }

  }

  ngOnInit(): void {

    this.route?.queryParams.subscribe((params:any) => {
      this.userId = +params['userId']; // (+) converts string 'id' to a number

   });
    if (!this.userId) {
      this.userId = this.localStore.getLocalStorage(this.masterDate.userId);
    }

    this.commonMethods.setCurrentLanguage();
    this.static_data = this.commonMethods.getCurrentLanguage();
  }
  isSelected(index: number) {
    if (this.selectIndex == index) {
      return false;
    } else {
      return true;
    }
  }
  //Get Lobby Value
  getLobbyRegistration(dataform: any) {

    this.lobbyRegisData = dataform;
    if (this.lobbyRegisData.lobbyType == 'Individual') {
      this.selectIndex += 3;
    } else {
      this.selectIndex += 1;
    }
    let {
      year,
      lobbyType,
      firstName,
      lastName,
      firmName,
      address1,
      address2,
      phone,
      zipcode,
      city,
      state,
      email,
    } = dataform;

    this.LobbyRegistrationDate.year = year;
    this.LobbyRegistrationDate.type = lobbyType;
      this.LobbyRegistrationDate.firstName = firstName,
      this.LobbyRegistrationDate.lastName = lastName,
      this.LobbyRegistrationDate.organisationName = firmName,
      this.LobbyRegistrationDate.address1 = address1,
      this.LobbyRegistrationDate.address2 = address2,
      this.LobbyRegistrationDate.phone = phone,
      this.LobbyRegistrationDate.zipCode = zipcode,
      this.LobbyRegistrationDate.stateCode = state,
      this.LobbyRegistrationDate.email = email,
      this.LobbyRegistrationDate.city = city;
      this.LobbyRegistrationDate.userID = parseInt(this.userId);
  }

  getLobbyEmployee(data: any) {
    let list = data.map((dat: any) => {
      let { lobbyist, firstName, lastName, phone, email} = dat;
      return {
        tenantId: 0,
        lobbyist,
        firstName,
        lastName,
        email,
        phone,
        address1:"",
        address2:"",
        stateCode:"",
        city:"",
        zipcode:"",
        countryCode:"",
        userId : parseInt(this.userId)
      };
    });
   console.log(list);
    this.LobbyRegistrationDate.employeeInfo = list;
    this.selectIndex += 1;
  }

  getSubcontractorsList(data: any) {
    let list = data.map((dat: any) => {
      let { type, subcontractorName, phone, email } = dat;
      return {
        tenantId: 0,
        type,
        subcontractorName,
        phone:'',
        email,
        address1:"",
        address2:"",
        stateCode:"",
        city:"",
        zipcode:"",
        countryCode:"",
        firstName:"",
        lastName:"",
        userId : parseInt(this.userId)
      };
    });
    console.log(list);
    this.LobbyRegistrationDate.subContractorInfo = list;
    this.selectIndex += 1;
  }

  getRelationshipsList(data: any) {
    let list = data.map((dat: any) => {
      let {
        lobbyist,
        officialName,
        officialTitle,
        relationship,
        entityName,
      } = dat;
      return {
        tenantId: 0,
        lobbyist,
        officialName,
        officialTitle,
        relationship,
        entityName,
        address1:"",
        address2:"",
        city:"",
        zipcode:"",
        stateCode:"",
        countryCode:"",
        firstName:"",
        lastName:"",
        phone:"",
        email:"",
        userId : parseInt(this.userId)
      };
    });
    console.log(list);
    this.LobbyRegistrationDate.relationship = list;
    this.selectIndex += 1;
  }

  getClientList(data: any) {
    let list = data.map((dat: any) => {
      let {
        client,
        companyName,
        lobbyist,
        natureOfBusiness,
        legislativeMatters,
        address1,
        address2,
        zipcode,
        city,
        state,
      } = dat;
      return {
        tenantId: 0,
        client,
        organisationName:companyName,
        lobbyist,
        BusinessName:natureOfBusiness,
        remarks:legislativeMatters,
        address1,
        address2,
        zip:zipcode,
        city,
        state,
        countryCode:"",
        firstName:"",
        lastName:"",
        phone:"",
        email:"",
        stateCode:"",
        zipcode:"",
        userId : parseInt(this.userId)
      };
    });
    console.log(list);
    this.LobbyRegistrationDate.clientInfo = list;
    this.selectIndex += 1;
  }

  // signatureEmitter(data:any){
  //   let list = data.map((dat:any)=>{
  //     let { firstName, lastName, email } = dat
  //     return{
  //       "tenantId":0,
  //       firstName,
  //       lastName,
  //       email,
  //     }
  //   })
  //     console.log(list);
  // }
  getSignaturePad(data: any) {

    let { signature } = data;
    this.LobbyRegistrationDate.signature = data;
    this.lobbyistDataSubmit();
  }
  backbtn(tab: any) {
    this.selectIndex = this.selectIndex - 1;
  }
  lobbyistDataSubmit() {
    console.log(this.LobbyRegistrationDate);

    this.service.postData(this.urlService.lobbyistInformation,this.LobbyRegistrationDate).subscribe((res: any) => {
      // this.snackbar.snackbarSuccess("Lobbyist Information Updated Succesfully");
      this.confirm = true
    },err =>{
      this.snackbar.snackbarError("Issue while Save Committee", this.masterDate.centre);
    })
  }
}
