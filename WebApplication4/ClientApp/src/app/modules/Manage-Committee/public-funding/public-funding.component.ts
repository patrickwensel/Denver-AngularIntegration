import { Component, OnInit } from '@angular/core';
import { CommonMethods } from 'src/app/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-funding',
  templateUrl: './public-funding.component.html',
  styleUrls: ['./public-funding.component.scss']
})
export class PublicFundingComponent implements OnInit {

  static_data: any;

  labels = [{
    displayName: 'Intent to Participate',
    routerLink: ''
  },
  {
    displayName: 'Application for Certification',
    routerLink: ''
  },
  {
    displayName: 'Withdrawal from Fair Electronics Fund',
    routerLink: ''
  },
  {
    displayName: 'Qualifying Contributors',
    routerLink: ''
  },
  ]

  constructor(
    private commonMethods: CommonMethods,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.commonMethods.setCurrentLanguage();
    this.static_data = this.commonMethods.getCurrentLanguage();
  }
  back() {
    this.router.navigate(["/manage/manage_committee/existing-committee"]);
  }


}
