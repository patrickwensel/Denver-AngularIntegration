import { Injectable } from '@angular/core';
export const ApplicationName = 'Denver';

export const ReturnUrlType = 'returnUrl';

export const QueryParameterNames = {
  ReturnUrl: ReturnUrlType,
  Message: 'message'
};

export const LogoutActions = {
  LogoutCallback: 'logout-callback',
  Logout: 'logout',
  LoggedOut: 'logged-out'
};

export const LoginActions = {
  Login: 'login',
  LoginCallback: 'login-callback',
  LoginFailed: 'login-failed',
  Profile: 'profile',
  Register: 'register'
};

let applicationPaths: ApplicationPathsType = {
  DefaultLoginRedirectPath: '/',
  ApiAuthorizationClientConfigurationUrl: `/_configuration/${ApplicationName}`,
  Login: `authentication/${LoginActions.Login}`,
  LoginFailed: `authentication/${LoginActions.LoginFailed}`,
  LoginCallback: `authentication/${LoginActions.LoginCallback}`,
  Register: `authentication/${LoginActions.Register}`,
  Profile: `authentication/${LoginActions.Profile}`,
  LogOut: `authentication/${LogoutActions.Logout}`,
  LoggedOut: `authentication/${LogoutActions.LoggedOut}`,
  LogOutCallback: `authentication/${LogoutActions.LogoutCallback}`,
  LoginPathComponents: [],
  LoginFailedPathComponents: [],
  LoginCallbackPathComponents: [],
  RegisterPathComponents: [],
  ProfilePathComponents: [],
  LogOutPathComponents: [],
  LoggedOutPathComponents: [],
  LogOutCallbackPathComponents: [],
  IdentityRegisterPath: '/Identity/Account/Register',
  IdentityManagePath: '/Identity/Account/Manage'
};

applicationPaths = {
  ...applicationPaths,
  LoginPathComponents: applicationPaths.Login.split('/'),
  LoginFailedPathComponents: applicationPaths.LoginFailed.split('/'),
  RegisterPathComponents: applicationPaths.Register.split('/'),
  ProfilePathComponents: applicationPaths.Profile.split('/'),
  LogOutPathComponents: applicationPaths.LogOut.split('/'),
  LoggedOutPathComponents: applicationPaths.LoggedOut.split('/'),
  LogOutCallbackPathComponents: applicationPaths.LogOutCallback.split('/')
};

interface ApplicationPathsType {
  readonly DefaultLoginRedirectPath: string;
  readonly ApiAuthorizationClientConfigurationUrl: string;
  readonly Login: string;
  readonly LoginFailed: string;
  readonly LoginCallback: string;
  readonly Register: string;
  readonly Profile: string;
  readonly LogOut: string;
  readonly LoggedOut: string;
  readonly LogOutCallback: string;
  readonly LoginPathComponents: string[];
  readonly LoginFailedPathComponents: string[];
  readonly LoginCallbackPathComponents: string[];
  readonly RegisterPathComponents: string[];
  readonly ProfilePathComponents: string[];
  readonly LogOutPathComponents: string[];
  readonly LoggedOutPathComponents: string[];
  readonly LogOutCallbackPathComponents: string[];
  readonly IdentityRegisterPath: string;
  readonly IdentityManagePath: string;
}

export const ApplicationPaths: ApplicationPathsType = applicationPaths;

@Injectable()
export class MasterUrlService {
  constructor() { }

  loginUrl = `authentication/${LoginActions.Login}`;
  getUserDetailUrl = `authentication/${LoginActions.Profile}`;

  //// API Token getting details
  //grantType = 'password';
  //clientId = 'ro.client';
  //clientSecret = 'secret';
  //scope = 'api1';
  //TokenUrl = '/identityServer/connect/token';
 //User Management
 CreateContactInformation = 'api/UserManagement/CreateContactInformation';
 loginInformation = 'api/UserManagement/LoginInformation';
 committeeGetList = 'api/common/lookups/getList';
 ballotInformation = 'api/Committee/ballotissue/getList';
 lookupGetList ='api/common/lookups/getList'
 getallUserType = 'api/UserManagement/GetAllUserType';
 chooseUserType = 'api/UserManagement/ChooseUserType';
 committeeInformation = 'api/committee/createDetails';
 lobbyistInformation ='api/Lobbyist/createLobbyist';
 iefAdditionalInfo = 'api/UserManagement/UpdateIEFAdditionalInfo';
 confirmSubmit = 'api/UserManagement/GetUserAccountConfirmAndSubmit';
 getLobbyID = 'api/Lobbyist/GetLobbyist';
getClients ='api/Lobbyist/Getclient';
 //Committee
 committeeList = 'api/Committee/getListByName';
 committeeAditionalInfo = 'api/committee/UpdateCommitteeAdditionalInfo';
//   //Logout
//   logout = '/ClientPortal/api/AdminManagement/LogoutStatusUpdate';


 //Committee Office
 getStatelist = 'api/common/state/getList';
 getStatusList = 'api/common/status/getList';
 getOfficerTypeList = 'api/common/lookups/getList';
 getList = 'api/common/lookups/getList';
 getOfficeSearchByName = 'api/UserManagement/GetOfficerListByName';
 getCommitteeDetails = 'api/Committee/GetCommitteeDetail';
 getManageCommitteeList = 'api/UserManagement/GetManageFilerDetail';
//  api/UserManagement/GetManageFilerDetail
//lobbyist
lobbyList = 'api/Lobbyist/GetLobbyist';
updatelobbyList = 'api/Lobbyist/UpdateLobbyistAdditionalInfo';

//Indipendent expenduture
indipendentList = 'api/UserManagement/GetIndependentSpender';

// auth APIs
login = 'api/UserManagement/CheckLoginUser';
resetPassword = 'api/UserManagement/ResetPassword';
forgotPassword = 'api/UserManagement/ForgotPassword';

//System Management
createBallot = 'api/SystemManagement/CreateBallotIssues';
getBallot = 'api/SystemManagement/GetBallotIssuesList';
updateBallotIssue = 'api/SystemManagement/UpdateBallotIssues';
deleteBallotIssue = 'api/SystemManagement/DeleteBallotIssues';
createContribution = 'api/SystemManagement/CreateContributionLimits';
updateContribution = 'api/SystemManagement/UpdateContributionLimits';
deleteContribution = 'api/SystemManagement/DeleteContributionLimits';
getContribution = 'api/SystemManagement/GetContributionLimitsList';
getFilerTypeList = 'api/SystemManagement/GetFillerTypeList';
getDonorTypeList = 'api/SystemManagement/GetDonorTypeList';
getOfficeTypeList = 'api/SystemManagement/GetOfficeTypeList';
getElectionList = 'api/SystemManagement/GetElectionList';
addCommitteeType = 'api/SystemManagement/AddCommitteType';
updateCommitteeType = 'api/SystemManagement/UpdateCommitteType';
deleteCommitteeType = 'api/SystemManagement/DeleteCommitteeType';
getCommitteTypeList = 'api/SystemManagement/GetCommitteTypeList';
addOffice = 'api/SystemManagement/AddOffice';
updateOffice = 'api/SystemManagement/UpdateOffice';
deleteOffice = 'api/SystemManagement/DeleteOffice';
getallOfficeList = 'api/SystemManagement/GetallOfficeList';
addMatchingLimits = 'api/SystemManagement/AddMatchingLimits';
updateMatchingLimits = 'api/SystemManagement/UpdateMatchingLimits';
deleteMatchingLimits = 'api/SystemManagement/DeleteMatchingLimits';
getMatchingLimitsList = 'api/SystemManagement/GetMatchingLimitsList';
createModifyForm = 'api/SystemManagement/CreateModifyFormImageUpload';
updateModifyForm = 'api/SystemManagement/UpdateModifyFormImageUpload';
permissionList = 'api/SystemManagement/GetUserPermissionList';
getCommitteeListBallot = 'api/SystemManagement/GetCommiteeListMatchingBallotCode'

// Switch Committee
// CommitteeLobbyList = 'api/Committee/GetCommitteeandLobbyistbyUser?id=';
CommitteeLobbyList = 'api/Committee/GetCommitteeandLobbyistbyUser?id=';
CommitteeLobbyDetail = 'api/Committee/GetCommitteeorLobbyistbyID?id=';
getCommiteeDetail = 'api/Committee/GetCommitteeDetail?committeeId=';
CommitteeDetail = 'api/Committee/GetSwitchCommitteeDetails?id=';
LobbyistDetail = 'api/Committee/GetSwitchLobbyistDetails?id=';
IEDetail = 'api/Committee/GetSwitchIEDetails?id=';

// Send / Join APIs
sendCommittee = 'api/Committee/SendCommittee';
sendLobbyist = 'api/Lobbyist/SendLobbyist';
sendIE = 'api/UserManagement/SendIndependentSpender';
saveIE = 'api/UserManagement/UpdateIEFAdditionalInfo';

//manage Committee
updateCommitteeStatus='api/Committee/UpdateCommitteeStatus?committeeID=';

//UserManagement
getManageFilerDetail='api/UserManagement/GetManageFilerDetail';
}
