import { Injectable } from "@angular/core";
import { CommonMethods } from "src/app/core";
@Injectable()
export class ErrorMessageService {
  constructor(private commonMethods: CommonMethods) {}

  static_data = this.commonMethods.getCurrentLanguage();
  userId = "User Required";
  createAccount = {
    firstNameReq: `Please enter the ${this.static_data.create_account.contact_info.first_name}`,
    firstNamePattern: `${this.static_data.create_account.contact_info.first_name} Accept only alphabet`,
    lastNameReq: `Please enter the ${this.static_data.create_account.contact_info.last_name}`,
    lastNamePattern: `${this.static_data.create_account.contact_info.last_name} Accept only alphabet`,
    mailAdd1: `Please enter the ${this.static_data.create_account.contact_info.mail_addrs_1}`,
    Address1Pattern: `Please enter a valid input`,
    mailAdd2: `Please enter the ${this.static_data.create_account.contact_info.mail_addrs_2}`,
    Address2Pattern: `Please enter a valid input`,
    phoneReq: `Please enter the ${this.static_data.create_account.contact_info.phone} Number`,
    phonePattern: `Please enter a valid input`,
    maximumLimit: "Maximum limit reached",
    cityReq: `Please enter the ${this.static_data.create_account.contact_info.city}`,
    zipcodeReq: `Please enter the ${this.static_data.create_account.contact_info.zipcode}`,
    stateReq: `Please enter the ${this.static_data.create_account.contact_info.state}`,
  };

  committee_registration = {
    zipCodeReq: `Please enter a valid input`,
  };

  LobbyistRegistration = {
    yearReq: `${this.static_data.lobbyist.register.year} Required`,
    yearPattern: `${this.static_data.lobbyist.register.year} Accept Only 4 Numeric`,
    lobbyTypeReq: `${this.static_data.lobbyist.register.lobby_type} Required`,
    firstNameReq: `${this.static_data.lobbyist.register.first_name} Required`,
    firstNamePattern: `${this.static_data.lobbyist.register.first_name} Accept only alphabet`,
    lastNameReq: `${this.static_data.lobbyist.register.last_name} Required`,
    lastNamePattern: `${this.static_data.lobbyist.register.last_name} Accept only alphabet`,
    OrgNameReq: `${this.static_data.lobbyist.register.firm_name} Required`,
    mailAdd1: `${this.static_data.lobbyist.register.bus_Address1} Required`,
    mailAdd2: `${this.static_data.lobbyist.register.bus_Address2} Required`,
    Address1Pattern: `${this.static_data.lobbyist.register.bus_Address1} cannot include special characters other than (,./-#@&%:)`,
    Address2Pattern: `${this.static_data.lobbyist.register.bus_Address2} cannot include special characters other than (,./-#@&%:)`,
    phoneReq: `${this.static_data.lobbyist.register.phone} Required`,
    phonePattern: `${this.static_data.lobbyist.register.phone} Accept only Numeric`,
    emailReq: `${this.static_data.lobbyist.register.email} Required`,
    emailPattern: `${this.static_data.lobbyist.register.email} Accept only Mail ID`,
    zipcode: `${this.static_data.lobbyist.register.zip_code} Required`,
    city: `${this.static_data.lobbyist.register.city} Required`,
    state: `${this.static_data.lobbyist.register.state} Required`,
  };

  setPassword = {
    emailReq: `Please enter the email ID`,
    emailPattern: "Invalid Email ID",
    passwordReq: `Please enter the password`,
    oldPasswordReq: `Please enter the Old Password`,
    passwordPattern:
      "The entered Password should have At least 1 Upper case,Lower case,Numeric,Special character without space",
    cnfPassword: "Please confirm the password entered",
    PasswordMatch: "Password doesn't match",
  };
  frmLogin = {
    emailReq: "Please enter the Email ID",
    emailPattern: "Invalid Email ID",
    passwordReq: "Please enter your password to login",
    passwordPattern:
      "The Password should contain One special character/One upper case/One lower case and One number",
    passwordLength: "The Password should contain atleast 8 characters",
  };
  bankInformation = {
    bankName: `${this.static_data.committee_registration.bank_info.bankName} Required`,
    bankNamePattern: `${this.static_data.committee_registration.bank_info.bankName} Accept only AlphaNumeric`,
    address1: `${this.static_data.committee_registration.bank_info.Address1} Required`,
    address2: `${this.static_data.committee_registration.bank_info.Address2} Required`,
    city: `${this.static_data.committee_registration.bank_info.city} Required`,
    state: `${this.static_data.committee_registration.bank_info.state} Required`,
    zip: `${this.static_data.committee_registration.bank_info.zipcode} Required`,
  };
  committeeInformation = {
    committeeName: `${this.static_data.committee_registration.committee_info.committee_name} Required`,
    committeeNamePattern: `${this.static_data.committee_registration.committee_info.committee_name} Accept only AlphaNumeric`,
    position: `${this.static_data.committee_registration.committee_info.position} Required`,
    committeeType: `${this.static_data.committee_registration.committee_info.committee_type} Required`,
    electionDate: `${this.static_data.committee_registration.committee_info.election_date} Required`,
    purpose: `${this.static_data.committee_registration.committee_info.purpose}  Required`,
    ballotIssue: `${this.static_data.committee_registration.committee_info.ballot_issue} Required`,
    officeType: `${this.static_data.committee_registration.commitee_office.office_type} Required`,
    candidate_first_name: `${this.static_data.committee_registration.committee_info.candidate_first_name} Required`,
    candidate_last_name: `${this.static_data.committee_registration.committee_info.candidate_last_name} Required`,
    office_sought: `${this.static_data.committee_registration.committee_info.office_sought} Required`,
    minlength:`Committee type should be more than 2 letters`
  };
  committeeContact = {
    address1: `${this.static_data.committee_registration.commitee_contact.address_1} Required`,
    Address1Pattern: `${this.static_data.committee_registration.commitee_contact.address_1} cannot include special characters other than (,./-#@&%:)`,
    address2: `${this.static_data.committee_registration.commitee_contact.address_2} Required`,
    Address2Pattern: `${this.static_data.committee_registration.commitee_contact.address_2} cannot include special characters other than (,./-#@&%:)`,
    city: `${this.static_data.committee_registration.commitee_contact.city} Required`,
    campPhone: `${this.static_data.committee_registration.commitee_contact.camp_phone} Required`,
    camphonePattern: `${this.static_data.committee_registration.commitee_contact.camp_phone} Accept only Numeric`,
    state: `${this.static_data.committee_registration.commitee_contact.state} Required`,
    zipCode: `${this.static_data.committee_registration.commitee_contact.zipcode} Required`,
    campEmail: `${this.static_data.committee_registration.commitee_contact.camp_email} Required`,
    campemailPattern: `${this.static_data.committee_registration.commitee_contact.camp_email} Accept only Mail ID`,
    altPhone: `${this.static_data.committee_registration.commitee_contact.alt_phone} Required`,
    althonePattern: `${this.static_data.committee_registration.commitee_contact.alt_phone} Accept only Numeric`,
    altEmail: `${this.static_data.committee_registration.commitee_contact.alt_email} Required`,
    altemailPattern: `${this.static_data.committee_registration.commitee_contact.alt_email} Accept only Mail ID`,
    commWebsite: `${this.static_data.committee_registration.commitee_contact.comm_website} Required`,
    commWebsitePattern: `${this.static_data.committee_registration.commitee_contact.comm_website} Accept only Website url`,
  };

  lobbyRelationshipForm = {
    lobbyist: `${this.static_data.lobbyist.relationship.lobbyist} Required`,
    officialNameReq: `${this.static_data.lobbyist.relationship.official_name} Required`,
    officialTitleReq: `${this.static_data.lobbyist.relationship.official_title} Required`,
    relationshipReq: `${this.static_data.lobbyist.relationship.relationship} Required`,
    entityNameReq: `${this.static_data.lobbyist.relationship.entity_name} Required`,
  };
  lobbySubcontractors = {
    typeReq: `${this.static_data.lobbyist.subcontractors.type} Required`,
    subcontractorNameReq: `${this.static_data.lobbyist.subcontractors.subcontractor_name} Required`,
    subcontractorPattern: `${this.static_data.lobbyist.subcontractors.subcontractor_name} Accept only alphabet`,
    phoneReq: `${this.static_data.lobbyist.subcontractors.phone_number} Required`,
    phonePattern: `${this.static_data.lobbyist.subcontractors.phone_number} Accept only numeric`,
    emailReq: `${this.static_data.lobbyist.subcontractors.email} Required`,
    emailPattern: `${this.static_data.lobbyist.subcontractors.email} Accept only Mail ID`,
  };

  LobbyEmployees = {
    lobbyistReq: `${this.static_data.lobbyist.employees.lobbyist} Required`,
    firstNameReq: `${this.static_data.lobbyist.employees.first_name} Required`,
    firstNamePattern: `${this.static_data.lobbyist.employees.first_name} Accept only alphabet`,
    lastNameReq: `${this.static_data.lobbyist.employees.last_name} Required`,
    lastNamePattern: `${this.static_data.lobbyist.employees.last_name} Accept only alphabet`,
    phoneReq: `${this.static_data.lobbyist.employees.phone} Required`,
    phonePattern: `${this.static_data.lobbyist.employees.phone} Accept only numeric`,
    emailReq: `${this.static_data.lobbyist.employees.email} Required`,
    emailPattern: `${this.static_data.lobbyist.employees.email} Accept only Mail ID`,
  };

  LobbyistClients = {
    clientReq: `${this.static_data.lobbyist.clients.client} Required`,
    organisationNameReq: `${this.static_data.lobbyist.clients.company_name} Required`,
    lobbyistReq: `${this.static_data.lobbyist.clients.lobbyist} Required`,
    natureBusinessReq: `${this.static_data.lobbyist.clients.nature_of_business} Required`,
    legislativeReq: `${this.static_data.lobbyist.clients.legislative_matters} Required`,
    Add1Req: `${this.static_data.lobbyist.clients.address1} Required`,
    Add2Req: `${this.static_data.lobbyist.clients.address2} Required`,
    Address2Pattern: `${this.static_data.lobbyist.clients.address2} cannot include special characters other than (,./-#@&%:)`,
    Address1Pattern: `${this.static_data.lobbyist.clients.address1} cannot include special characters other than (,./-#@&%:)`,
  };

  LobbySignature = {
    firstNameReq: `${this.static_data.lobbyist.signature.first_name} Required`,
    firstNamePattern: `${this.static_data.lobbyist.signature.first_name} Accept only alphabet`,
    lastNameReq: `${this.static_data.lobbyist.signature.last_name} Required`,
    lastNamePattern: `${this.static_data.lobbyist.signature.last_name} Accept only alphabet`,
    emailReq: `${this.static_data.lobbyist.signature.email} Required`,
    emailPattern: `${this.static_data.lobbyist.signature.email} Accept only Mail ID`,
    signature: `${
      (this, this.static_data.lobbyist.signature.signature)
    } Required`,
  };

  manageCommittee = {
    searchFilers: `${this.static_data.manage_committee.search_filers} Required`,
    filerType: `${this.static_data.manage_committee.filer_type} Required`,
    filerStatus: `${this.static_data.manage_committee.filer_status} Required`,
  };
  ief = {
    occupation: `${this.static_data.create_account.additional_information_IEF.occupation} Required`,
    employer: `${this.static_data.create_account.additional_information_IEF.employer} Required`,
    organizationName: `${this.static_data.create_account.additional_information_IEF.organizationName} Required`,
  };
  ballotIssue = {
    issueNumber: `${this.static_data.system_Management.ballot_Issues_heading.issue_Number} Required`,
    issueName: `${this.static_data.system_Management.ballot_Issues_heading.issue_Name} Required`,
    description: `${this.static_data.system_Management.ballot_Issues_heading.description} Required`,
    electionCycle: `${this.static_data.system_Management.ballot_Issues_heading.election_cycle} Required`,
  };
  public_funding = {
    election_cycle: `${this.static_data.public_funding.election_cycle} Required`,
    qualifying_offices: `${this.static_data.public_funding.qualifying_offices} Required`,
    available: `${this.static_data.public_funding.available} Required`,
    ratio: `${this.static_data.public_funding.ratio} Required`,
    qualifying_contribution: `${this.static_data.public_funding.qualifying_contribution} Required`,
    number_of_req: `${this.static_data.public_funding.number_of_req} Required`,
    contr_limit: `${this.static_data.public_funding.contr_limit} Required`,
    contr_amount: `${this.static_data.public_funding.contr_amount} Required`,
    start_date: `Start date Required`,
    end_date: `End date Required`,
    min_error: `End date should not be less than start date`,
  };
  system_management = {
    offices :`${this.static_data.office.office_Name} Required`
  }
  checkErrorMessage(formType: any, type: string) {
    switch (type) {
      // sample
      case "loginEmail":
        return formType.hasError("required")
          ? this.frmLogin.emailReq
          : formType.hasError("pattern")
          ? this.frmLogin.emailPattern
          : "";
      case "loginPassword":
        return formType.hasError("required")
          ? this.frmLogin.passwordReq
          : formType.hasError("minlength")
          ? this.frmLogin.passwordLength
          : formType.hasError("pattern")
          ? this.frmLogin.passwordPattern
          : "";
      case "forgotemail":
        return formType.hasError("required")
          ? this.frmLogin.emailReq
          : formType.hasError("pattern")
          ? this.frmLogin.emailPattern
          : "";
      case "emailValidation":
        return formType.hasError("pattern") ? this.userId : "";
      case "contactfirstName":
        return formType.hasError("required")
          ? this.createAccount.firstNameReq
          : formType.hasError("maxlength")
          ? this.createAccount.maximumLimit
          : formType.hasError("pattern")
          ? this.createAccount.firstNamePattern
          : "";
      case "contactlastName":
        return formType.hasError("required")
          ? this.createAccount.lastNameReq
          : formType.hasError("maxlength")
          ? this.createAccount.maximumLimit
          : formType.hasError("pattern")
          ? this.createAccount.lastNamePattern
          : "";
      case "mailingAdd1":
        return formType.hasError("required")
          ? this.createAccount.mailAdd1
          : formType.hasError("maxlength")
          ? this.createAccount.maximumLimit
          : formType.hasError("pattern")
          ? this.createAccount.Address1Pattern
          : "";
      case "mailingAdd2":
        return formType.hasError("required")
          ? this.createAccount.mailAdd2
          : formType.hasError("maxlength")
          ? this.createAccount.maximumLimit
          : formType.hasError("pattern")
          ? this.createAccount.Address2Pattern
          : "";
      case "contactzipcode":
        return formType.hasError("required")
          ? this.createAccount.zipcodeReq
          : "";
      case "contactcity":
        return formType.hasError("required") ? this.createAccount.cityReq : "";
      case "contactState":
        return formType.hasError("required") ? this.createAccount.stateReq : "";
      case "contactphones":
        return formType.hasError("required")
          ? this.createAccount.phoneReq
          : formType.hasError("minlength")
          ? this.createAccount.phonePattern
          : "";
      case "year":
        return formType.hasError("required")
          ? this.LobbyistRegistration.yearReq
          : formType.hasError("pattern")
          ? this.LobbyistRegistration.yearPattern
          : "";
      case "lobbyType":
        return formType.hasError("required")
          ? this.LobbyistRegistration.lobbyTypeReq
          : "";
      case "firstName":
        return formType.hasError("required")
          ? this.LobbyistRegistration.firstNameReq
          : formType.hasError("pattern")
          ? this.LobbyistRegistration.firstNamePattern
          : "";
      case "lastName":
        return formType.hasError("required")
          ? this.LobbyistRegistration.lastNameReq
          : formType.hasError("pattern")
          ? this.LobbyistRegistration.lastNamePattern
          : "";
      case "firmName":
        return formType.hasError("required")
          ? this.LobbyistRegistration.OrgNameReq
          : "";
      case "address1":
        return formType.hasError("required")
          ? this.LobbyistRegistration.mailAdd1
          : formType.hasError("pattern")
          ? this.LobbyistRegistration.Address1Pattern
          : "";
      case "address2":
        return formType.hasError("required")
          ? this.LobbyistRegistration.mailAdd2
          : formType.hasError("pattern")
          ? this.LobbyistRegistration.Address2Pattern
          : "";
      case "phone":
        return formType.hasError("required")
          ? this.LobbyistRegistration.phoneReq
          : formType.hasError("pattern")
          ? this.LobbyistRegistration.phonePattern
          : "";
      case "email":
        return formType.hasError("required")
          ? this.LobbyistRegistration.emailReq
          : formType.hasError("pattern")
          ? this.LobbyistRegistration.emailPattern
          : "";
      case "city":
        return formType.hasError("required")
          ? this.LobbyistRegistration.city
          : "";
      case "state":
        return formType.hasError("required")
          ? this.LobbyistRegistration.state
          : "";
      case "zipcode":
        return formType.hasError("required")
          ? this.LobbyistRegistration.zipcode
          : "";
      case "setpasswordemail":
        return formType.hasError("required")
          ? this.setPassword.emailReq
          : formType.hasError("pattern")
          ? this.setPassword.emailPattern
          : "";
      case "setpasswordpassword":
        return formType.hasError("required")
          ? this.setPassword.passwordReq
          : formType.hasError("pattern")
          ? this.setPassword.passwordPattern
          : "";
      case "setoldpassword":
        return formType.hasError("required")
          ? this.setPassword.oldPasswordReq
          : formType.hasError("pattern")
          ? this.setPassword.passwordPattern
          : "";
      case "setpasswordconfirmpassword":
        return formType.hasError("required")
          ? this.setPassword.cnfPassword
          : "";
      case "lobbyist":
        return formType.hasError("required")
          ? this.lobbyRelationshipForm.lobbyist
          : "";
      case "officialName":
        return formType.hasError("required")
          ? this.lobbyRelationshipForm.officialNameReq
          : "";
      case "officialTitle":
        return formType.hasError("required")
          ? this.lobbyRelationshipForm.officialTitleReq
          : "";

      case "relationship":
        return formType.hasError("required")
          ? this.lobbyRelationshipForm.relationshipReq
          : "";
      case "entityName":
        return formType.hasError("required")
          ? this.lobbyRelationshipForm.entityNameReq
          : "";
      case "type":
        return formType.hasError("required")
          ? this.lobbySubcontractors.typeReq
          : "";
      case "SubcontractorName":
        return formType.hasError("required")
          ? this.lobbySubcontractors.subcontractorNameReq
          : formType.hasError("pattern")
          ? this.lobbySubcontractors.subcontractorPattern
          : "";
      case "phoneNumber":
        return formType.hasError("required")
          ? this.lobbySubcontractors.phoneReq
          : formType.hasError("pattern")
          ? this.lobbySubcontractors.phonePattern
          : "";
      case "email":
        return formType.hasError("required")
          ? this.lobbySubcontractors.emailReq
          : formType.hasError("pattern")
          ? this.lobbySubcontractors.emailPattern
          : "";
      case "lobbyist":
        return formType.hasError("required")
          ? this.LobbyEmployees.lobbyistReq
          : "";
      case "firstName":
        return formType.hasError("required")
          ? this.LobbyEmployees.firstNameReq
          : formType.hasError("pattern")
          ? this.LobbyEmployees.firstNamePattern
          : "";
      case "lastName":
        return formType.hasError("required")
          ? this.LobbyEmployees.lastNameReq
          : formType.hasError("pattern")
          ? this.LobbyEmployees.lastNamePattern
          : "";
      case "contactphone":
        return formType.hasError("required")
          ? this.LobbyEmployees.phoneReq
          : "";
      case "email":
        return formType.hasError("required")
          ? this.LobbyEmployees.emailReq
          : formType.hasError("pattern")
          ? this.LobbyEmployees.emailPattern
          : "";
      case "zipcode":
        return formType.hasError("required")
          ? this.committee_registration.zipCodeReq
          : formType.hasError("maxlength")
          ? this.createAccount.maximumLimit
          : "";
      case "client":
        return formType.hasError("required")
          ? this.LobbyistClients.clientReq
          : "";
      case "organisationName":
        return formType.hasError("required")
          ? this.LobbyistClients.organisationNameReq
          : "";
      case "lobbyist":
        return formType.hasError("required")
          ? this.LobbyistClients.lobbyistReq
          : "";
      case "BusinessName":
        return formType.hasError("required")
          ? this.LobbyistClients.natureBusinessReq
          : "";
      case "remarks":
        return formType.hasError("required")
          ? this.LobbyistClients.legislativeReq
          : "";
      case "address1":
        return formType.hasError("required")
          ? this.LobbyistClients.Add1Req
          : formType.hasError("pattern")
          ? this.LobbyistClients.Address1Pattern
          : "";
      case "address2":
        return formType.hasError("required")
          ? this.LobbyistClients.Add2Req
          : formType.hasError("pattern")
          ? this.LobbyistClients.Address2Pattern
          : "";
      case "bankName":
        return formType.hasError("required")
          ? this.bankInformation.bankName
          : formType.hasError("pattern")
          ? this.bankInformation.bankNamePattern
          : "";
      case "committeeName":
        return formType.hasError("required")
          ? this.committeeInformation.committeeName
          : formType.hasError("pattern")
          ? this.committeeInformation.committeeNamePattern
          : "";
      case "purpose":
        return formType.hasError("required")
          ? this.committeeInformation.purpose
          : "";
      case "committeeType":
        return formType.hasError("required")
          ? this.committeeInformation.committeeType :
          formType.hasError("minlength") ?
          this.committeeInformation.minlength 
          : "";
      case "electionDate":
        return formType.hasError("required")
          ? this.committeeInformation.electionDate
          : "";
      case "purpose":
        return formType.hasError("required")
          ? this.committeeInformation.position
          : "";
      case "ballotIssue":
        return formType.hasError("required")
          ? this.committeeInformation.ballotIssue
          : "";
      case "bankName":
        return formType.hasError("required")
          ? this.bankInformation.bankName
          : "";
      case "Address1":
        return formType.hasError("required")
          ? this.bankInformation.address1
          : "";
      case "Address1":
        return formType.hasError("required")
          ? this.bankInformation.address2
          : "";
      case "city":
        return formType.hasError("required") ? this.bankInformation.city : "";
      case "state":
        return formType.hasError("required") ? this.bankInformation.state : "";
      case "zipcode":
        return formType.hasError("required") ? this.bankInformation.zip : "";

      case "firstName":
        return formType.hasError("required")
          ? this.LobbySignature.firstNameReq
          : formType.hasError("pattern")
          ? this.LobbySignature.firstNamePattern
          : "";
      case "lastName":
        return formType.hasError("required")
          ? this.LobbySignature.lastNameReq
          : formType.hasError("pattern")
          ? this.LobbySignature.lastNamePattern
          : "";
      case "email":
        return formType.hasError("required")
          ? this.LobbySignature.emailReq
          : formType.hasError("pattern")
          ? this.LobbySignature.emailPattern
          : "";
      case "committee-address1":
        return formType.hasError("required")
          ? this.committeeContact.address1
          : formType.hasError("pattern")
          ? this.committeeContact.Address1Pattern
          : "";
      case "committee-address2":
        return formType.hasError("required")
          ? this.committeeContact.address2
          : formType.hasError("pattern")
          ? this.committeeContact.Address2Pattern
          : "";
      case "city":
        return formType.hasError("required") ? this.committeeContact.city : "";
      case "campPhone":
        return formType.hasError("required")
          ? this.committeeContact.campPhone
          : formType.hasError("pattern")
          ? this.committeeContact.campPhone
          : "";
      case "state":
        return formType.hasError("required") ? this.committeeContact.state : "";
      case "zipCode":
        return formType.hasError("required")
          ? this.committeeContact.zipCode
          : "";
      case "campEmail":
        return formType.hasError("required")
          ? this.committeeContact.campEmail
          : formType.hasError("pattern")
          ? this.committeeContact.campemailPattern
          : "";
      case "altPhone":
        return formType.hasError("required")
          ? this.committeeContact.altPhone
          : formType.hasError("pattern")
          ? this.committeeContact.althonePattern
          : "";
      case "altEmail":
        return formType.hasError("required")
          ? this.committeeContact.altEmail
          : formType.hasError("pattern")
          ? this.committeeContact.altemailPattern
          : "";
      case "commWebsite":
        return formType.hasError("required")
          ? this.committeeContact.commWebsite
          : formType.hasError("pattern")
          ? this.committeeContact.commWebsitePattern
          : "";
      case "officerType":
        return formType.hasError("required")
          ? this.committeeInformation.officeType
          : // : formType.hasError('pattern')
            // ? this.committeeContact.commWebsitePattern
            "";
      case "occupation":
        return formType.hasError("required") ? this.ief.occupation : "";
      case "employer":
        return formType.hasError("required") ? this.ief.employer : "";
      case "orgName":
        return formType.hasError("required") ? this.ief.organizationName : "";
      case "searchFilers":
        return formType.hasError("required")
          ? this.manageCommittee.searchFilers
          : "";
      case "filerType":
        return formType.hasError("required")
          ? this.manageCommittee.filerType
          : "";
      case "filerStatus":
        return formType.hasError("required")
          ? this.manageCommittee.filerStatus
          : "";
      case "issueNumber":
        return formType.hasError("required")
          ? this.ballotIssue.issueNumber
          : "";
      case "issueName":
        return formType.hasError("required") ? this.ballotIssue.issueName : "";
      case "description":
        return formType.hasError("required")
          ? this.ballotIssue.description
          : "";
      case "electionCycle":
        return formType.hasError("required")
          ? this.ballotIssue.electionCycle
          : "";
      case "election_cycle":
        return formType.hasError("required")
          ? this.public_funding.election_cycle
          : "";
      case "qualifying_offices":
        return formType.hasError("required")
          ? this.public_funding.qualifying_offices
          : "";
      case "available":
        return formType.hasError("required")
          ? this.public_funding.available
          : "";
      case "ratio":
        return formType.hasError("required") ? this.public_funding.ratio : "";
      case "qualifying_contribution":
        return formType.hasError("required")
          ? this.public_funding.qualifying_contribution
          : "";
      case "number_of_req":
        return formType.hasError("required")
          ? this.public_funding.number_of_req
          : "";
      case "contr_limit":
        return formType.hasError("required")
          ? this.public_funding.contr_limit
          : "";
      case "contr_amount":
        return formType.hasError("required")
          ? this.public_funding.contr_amount
          : "";
      case "start_date":
        return formType.hasError("required")
          ? this.public_funding.start_date
          : "";
      case "end_date":
        return formType.hasError("required")
          ? this.public_funding.end_date
          : formType.hasError("matDatepickerMin")
          ? this.public_funding.min_error
          : "";
      case "candidate_first_name":
        return formType.hasError("required")
          ? this.committeeInformation.candidate_first_name
          : "";
      case "candidate_last_name":
        return formType.hasError("required")
          ? this.committeeInformation.candidate_last_name
          : "";
      case "office_sought":
        return formType.hasError("required")
          ? this.committeeInformation.office_sought
          : "";
     case "office":
            return formType.hasError("required")
              ? this.system_management.offices
              : "";      
      default:
        return formType.hasError("required")
          ? type.charAt(0).toUpperCase() + type.slice(1) + " Required"
          : "!!Invalid error.";
    }
  }

  isRequired(fieldName: string) {
    return fieldName + " Required.";
  }
}
