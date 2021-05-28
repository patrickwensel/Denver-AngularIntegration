import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-summarycomponent',
  templateUrl: './summarycomponent.component.html',
  styleUrls: ['./summarycomponent.component.scss']
})
export class SummarycomponentComponent implements OnInit {

  @Input() summaryLabels: any;
  summaryItems: any;


  constructor(
  ) { }

  ngOnInit(): void {
    this.getSummaryItems();
  }


    getSummaryItems() {
      this.summaryItems = this.summaryLabels;
  }

}
