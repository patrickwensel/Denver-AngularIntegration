import { Component, OnInit } from '@angular/core';
import { CommonMethods } from 'src/app/core';
@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {
  listItems: any;
  static_data: any;
  
  constructor(
    private commonMethods: CommonMethods,
  ) { }
  candidateLabels = [ {
    displayName: 'Committee Types',
    routerLink: ['system/Management/commitee-type']
  },
  {
    displayName: 'Offices',
    routerLink: ['system/Management/offices']
  },
  {
    displayName: 'Ballot Measures',
    routerLink: ['system/Management/ballot-issue']
  },
  {
    displayName: 'Contribution Limit',
    routerLink: ['system/Management/contribution']
  },
  {
    displayName: 'Matching Limits',
    routerLink: ['system/Management/public-funding']
  },
  {
    displayName: 'Modify Forms',
    routerLink: ['system/Management/modify-forms']
  },
  {
    displayName: 'User Permission Types',
    routerLink: ['system/Management/User-permission']
  },
    ]
  ngOnInit(): void {
    this.commonMethods.setCurrentLanguage();
    this.static_data = this.commonMethods.getCurrentLanguage();
    this.listItems = this.candidateLabels
  }

}
