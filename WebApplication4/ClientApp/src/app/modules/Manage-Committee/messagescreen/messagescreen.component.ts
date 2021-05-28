import { Component, OnInit } from '@angular/core';
import { CommonMethods } from 'src/app/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from "@angular/common";

@Component({
  selector: 'app-messagescreen',
  templateUrl: './messagescreen.component.html',
  styleUrls: ['./messagescreen.component.scss']
})
export class MessagescreenComponent implements OnInit {
  static_data: any;
  msgform: FormGroup
  msgcontent: any;
  msghead: any;
  msgdate: any;
  searchmsg: any;
  minEndDate : any;


  sampleobj = [
    {
      heading: 'Next Report due',
      subheading: 'System notification',
      date: 'Thursday 11/03/20, 4.45am'   
    },
    {
      heading: 'Documentation ',
      subheading: 'System notification',
      date: 'Thursday 11/03/20, 4.45am'   
    },
    {
      heading: 'Add recent donations',
      subheading: 'System notification',
      date: 'Thursday 11/03/20, 4.45am'   
    },
    {
      heading: 'Add recent donations',
      subheading: 'System notification',
      date: 'Thursday 11/03/20, 4.45am'   
    },
    {
      heading: 'Add recent donations',
      subheading: 'System notification',
      date: 'Thursday 11/03/20, 4.45am'   
    },
    // {
    //   heading: 'Next Report due 12/10/20',
    //   subheading: 'System notification',
    //   date: 'Thursday 11/03/20, 4.45am'   
    // }
  ]

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private commonMethods: CommonMethods,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.commonMethods.setCurrentLanguage();
    this.static_data = this.commonMethods.getCurrentLanguage();
    this.initMsgForm();
    this.setmsginfo();
  }

  onStartDateChange() {
    this.minEndDate = this.msgform.value.StartDate;
  }

  initMsgForm() {
    this.msgform = this.fb.group({
      minDate: [],
      maxDate: [],
    })
  }

  setmsginfo() {
  this.msghead= 'Loreum ipsum',
  this.msgdate= 'Thursday, 12/01/2020',
  this.msgcontent= "Lorem ipsum dolor sit amet, ei vidit illud aperiri usu, semper scripta delectus pro at, ceteros  urbanitas nam ei. Ut vim habeo inani iusto. Vis ei legimus dolorem convenire, ei duo stet prima ullum. Vim eu option signiferumque, cum in simul dissentiunt, ea sed doctus similique voluptatum. Vero insolens ea est"
  }

  back(){
    this.location.back();
  }



}
