import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CommonMethods } from 'src/app/core';
export interface PeriodicElement {
  name: string;
  position: string;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 'testtetsetseteste', name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 'testtetsetseteste', name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 'testtetsetseteste', name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 'testtetsetseteste', name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 'testtetsetseteste', name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 'testtetsetseteste', name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 'testtetsetseteste', name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 'testtetsetseteste', name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 'testtetsetseteste', name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 'testtetsetseteste', name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-lobbydashboard',
  templateUrl: './lobbydashboard.component.html',
  styleUrls: ['./lobbydashboard.component.scss']
})
export class LobbydashboardComponent implements OnInit {

  datasource_length: any;
  dataSource: any;
  static_data: any;
  name = 'Jon Rios for City Council';


  constructor(
    private commonMethods: CommonMethods,
  ) { }

  ngOnInit(): void {
    this.dataSource = ELEMENT_DATA;
    this.commonMethods.setCurrentLanguage();
    this.static_data = this.commonMethods.getCurrentLanguage();
    // this.dataSource = new MatTableDataSource();

  }

}
