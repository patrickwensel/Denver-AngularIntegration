import { Component, OnInit } from '@angular/core';
import { LocalstorageService, CommonMethods } from 'src/app/core';

@Component({
  selector: 'app-candidatedashboard',
  templateUrl: './candidatedashboard.component.html',
  styleUrls: ['./candidatedashboard.component.scss']
})
export class CandidatedashboardComponent implements OnInit {

  userchoosen: any;
  listItems: any;
  summaryItems: any;
  static_data: any;


  name = 'Jon Rios for City Council';

  candidateLabels = [{
    displayName: 'Transactions',
    routerLink: []
  },
  {
    displayName: 'Campaign Finance Report',
    routerLink: []
  },
  {
    displayName: 'Financial Disclosure Statement',
    routerLink: []
  },
  {
    displayName: 'Search Transactions',
    routerLink: []
  },
  {
    displayName: 'Search Contacts',
    routerLink: []
  },
  ]

  IeLabels = [{
    displayName: 'Transactions',
    routerLink: []
  },
  {
    displayName: 'Independent Expenditure Report',
    routerLink: []
  },
  {
    displayName: 'Search Transactions',
    routerLink: []
  },
  {
    displayName: 'Search contacts',
    routerLink: []
  },
  ]

  // summary labels
  summaryPanelCandidateLabels = [
    {
      displayName: 'Total Contributions',
      number: '$1000'
    },
    {
      displayName: 'Total Expenditures',
      number: '$9,010'
    },
    {
      displayName: 'Next Report Due',
      number: '$8,907'
    },
  ]

  summaryPanelIe = [
    {
      displayName: 'Total Contributions',
      number: '$1,900'
    },
    {
      displayName: 'Total Expenditures',
      number: '$1000'
    },
  ]

  constructor(
    private localStore: LocalstorageService,
    private commonMethods: CommonMethods,
  ) {
  }

  ngOnInit(): void {
    this.userchoosen = this.localStore.getLocalStorage('user_chosen');
    this.commonMethods.setCurrentLanguage();
    this.static_data = this.commonMethods.getCurrentLanguage();
    this.getListItems();
    this.getSummaryItems();
  }

  getListItems() {
    let labelarray: any;
    this.listItems = [];
    console.log('==> method hit', this.userchoosen);
    if (this.userchoosen == "committee" ) {
      // labelarray = this.candidateLabels;
      this.listItems = this.candidateLabels;
    } else if (this.userchoosen == 'ie') {
      // labelarray = this.IeLabels;
      this.listItems = this.IeLabels;
    } else {
      this.listItems = this.candidateLabels;
    }
    //  else if (this.localrole = 'issuecomitee') {
    //   this.listItems = this.issuecommittee;
    // }
    // labelarray.forEach((element: any) => {
    //   let obj = {
    //     displayName: element
    //   }
    //   this.listItems.push(obj)
    // });
  }

  getSummaryItems() {
    let labelarray: any;
    this.summaryItems = [];
    this.summaryItems = this.summaryPanelCandidateLabels;
    if (this.userchoosen == 'committee') {
      this.summaryItems = this.summaryPanelCandidateLabels;
    } else if (this.userchoosen == 'ie') {
      this.summaryItems = this.summaryPanelIe;
    }
    // labelarray.forEach((element: any) => {
    //   let obj = {
    //     displayName: element,
    //     number: '$$$10'
    //   }
    //   this.summaryItems.push(obj)
    // });
  }
}

