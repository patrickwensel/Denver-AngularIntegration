import { Component, OnInit, Input } from '@angular/core';
import { LocalstorageService } from 'src/app/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigatescreen',
  templateUrl: './navigatescreen.component.html',
  styleUrls: ['./navigatescreen.component.scss']
})
export class NavigatescreenComponent implements OnInit {

  @Input() candidateLabels: any;
  // @Input() summaryLabels: any;
  // @Input() name: string;

  localrole: any;
  listItems: any;
  summaryItems: any;

  constructor(
    private localStore: LocalstorageService,
    public router: Router,
  ) {
  }

  ngOnInit(): void {
    this.localrole = this.localStore.getLocalStorage('role');
    this.getListItems();
    // this.getSummaryItems();
  }

  getListItems() {
    let labelarray: any;
    this.listItems = [];
      this.listItems = this.candidateLabels;
  }

  gotoScreen(item: any) {
    console.log(item.routerLink);
    this.router.navigate(item.routerLink);
  }

//   getSummaryItems() {
//     let labelarray: any;
//     this.summaryItems = [];
//     if (this.localrole == 'candidate') {
//       // labelarray = this.summaryPanelCandidateLabels;
//       this.summaryItems = this.summaryLabels;
//     } else if (this.localrole = 'ie') {
//       // labelarray = this.summaryPanelIe;
//       this.summaryItems = this.summaryPanelIe;
//     }
//     // labelarray.forEach((element: any) => {
//     //   let obj = {
//     //     displayName: element,
//     //     number: '$$$10'
//     //   }
//     //   this.summaryItems.push(obj)
//     // });
//   }

}
