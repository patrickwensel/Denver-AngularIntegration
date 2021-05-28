import { Injectable } from '@angular/core';
// import * as moment from 'moment';
// import 'moment-timezone';

@Injectable()
export class MasterDataService {
  center(arg0: string, center: any) {
    throw new Error('Method not implemented.');
  }
  constructor() { }

  isLoader = false;

  refillCreatedMsg = "Record moved to Verification Queue.";

  // Validation patterns
  phoneNumerhipenvalidation = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  emailValidations = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';
  onlyNumberPattern = /^[0-9]+$/;
  zipcodePattern = /^(\d{0,5})(\d{0,4})/;
  DOBAge = "DOB & Age";
  onlyAlpha = /^[a-zA-Z ]+$/;
  onlyAlphaNumber = /^[a-zA-Z0-9 ]+$/;
  addressPattern = /^([a-zA-Z0-9/\s#'.,@%&-/])+$/;
  password = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/
  dateFormat = 'MM/dd/yyyy';
  websiteRegex =/^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;
//   //Service Request Provider
//   searchProviderPlaceholder = 'Search Provider using Name, Address, Fax # or Phone #.';
//   searchReferralPlaceholder = "Search Referral Source using Name, Address, Fax # or Phone #.";
//   providerEmpty = "Search above and add the provider";
//   referralEmpty = "Search above and add the referral source";
//   patRemoved = 'Patient Unlinked Successfully';
//   insuranceEmptyMsg = "No Insurance has been selected.";

//   // Path name
  id = 'ID';
  login = 'login';
  createCommitte = '/committee/committee-registration';
  save = "Save";
  edit = 'Edit';
  add = 'Add';
  token = 'token';
  userDetail = 'user';
  userId = 'userId';
  email:'email';
  centre ='center';
  errorMsg = 'Unexpected error occour, Please try again later';
  invalidLogin ='Email or Password is invalid';
  yes ='Yes';
  no ='No';
  cancel ='Cancel';
  delete ='Delete';
  deleteConfirmation = "Are you sure, Do you want to delete ?"
  dashboard= '/dashboard/candidate';
  lobbyDashboard= '/dashboard/lobby';
  switchScreen= '/switch';
  public_funding = 'manage/manage_committee/public-funding';
  message_admin = 'manage/messages'
  switchScreenNav= '/switch/nav-switch';
  manageCommittee = '/manage/manage_committee'
}
