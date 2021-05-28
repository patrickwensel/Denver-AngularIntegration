import { Component, OnInit, Input } from '@angular/core';
import { CommonMethods } from 'src/app/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-lobby-existing-reports-table',
  templateUrl: './lobby-existing-reports-table.component.html',
  styleUrls: ['./lobby-existing-reports-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})

export class LobbyExistingReportsTableComponent implements OnInit {
  static_data: any;
  @Input() DataSource: any;
  dataSource: any;
  datasource_length: any;

  constructor(
    private commonMethods: CommonMethods,

  ) { }

  displayedColumns: string[] = ['filling_period', 'reporting_period', 'data_reported',
  'arrow', 'ammendment', 'view'];

  ngOnInit(): void {
    this.dataSource = this.DataSource;
    this.static_data = this.commonMethods.getCurrentLanguage();
  }

}
