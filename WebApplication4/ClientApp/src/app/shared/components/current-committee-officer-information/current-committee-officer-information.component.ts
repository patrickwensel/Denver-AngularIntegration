import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CommonMethods, ErrorMessageService, LocalstorageService, MasterDataService, MasterUrlService, SnackbarService } from 'src/app/core';
import { ClientService } from 'src/app/core/api-services/client.service';

// const detail = [
//   {
//     firstName: 'Lorem',
//     lastName: 'Ipsum',
//     OfficerType: 'Mayor',
//     isExpanded: false,
//     description: 'Test',
//     address1: 'Main Street',
//     address2: 'Main Street',
//     city: 'Tennesse',
//     state: 'California',
//     zip: '67895',
//     email: 'test@gmail.com',
//     phone: '9876543210',
//   },
//   {
//     firstName: 'Lorem',
//     lastName: 'Ipsum',
//     OfficerType: 'Mayor',
//     isExpanded: false,
//     description: 'Test',
//     address1: 'Main Street',
//     address2: 'Main Street',
//     city: 'Tennesse',
//     state: 'California',
//     zip: '67895',
//     email: 'test@gmail.com',
//     phone: '9876543210',
//   },
// ];

@Component({
  selector: 'app-current-committee-officer-information',
  templateUrl: './current-committee-officer-information.component.html',
  styleUrls: ['./current-committee-officer-information.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class CurrentCommitteeOfficerInformationComponent implements OnInit {
  isTableExpanded: any;
  committeeId:any=47;
  committeeDetail:any;
  officerList:any=[];

  officerArray:any = [];
  modal:any;
  @Input() Id: any;

  constructor(private commonMethods: CommonMethods,
    public masterDate: MasterDataService,
    public errorService: ErrorMessageService,
    private service: ClientService,
    private urlService: MasterUrlService,
    public snackbar: SnackbarService,
    private localStore: LocalstorageService,
    private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getCommitteeDetails();
  }


  dataSource = new MatTableDataSource();
  committeegrid: string[] = [
    'toggle',
    'firstName',
    'lastName',
    'OfficerType',
    'description',
  ];

  toggleTableRows() {
    this.isTableExpanded = !this.isTableExpanded;

    this.dataSource.data.forEach((row: any) => {
      row.isExpanded = this.isTableExpanded;
    });
  }
  getCommitteeDetails(){
    this.service.postData(this.urlService.getCommiteeDetail + this.Id, {}).subscribe((res) => {
      this.committeeDetail = res;
      const data = this.dataSource.data;
      console.log(this.committeeDetail);
      this.officerArray= this.committeeDetail.officer;

      for (let i = 0; i < this.officerArray.length; i++) {
        this.modal ={
          firstName:this.officerArray[i].firstName,
       lastName :this.officerArray[i].lastName,
       //this.officerType = this.officerArray.
       address1: this.officerArray[i].uAddress1,
       address2 : this.officerArray[i].uAddress2,
       city : this.officerArray[i].uCity,
       state : this.officerArray[i].uState,
       zipcode : this.officerArray[i].uZipcode,
       email : this.officerArray[i].uEmail,
       phone : this.officerArray[i].uPhone,
        }
        console.log(this.modal);
        data.push(this.modal);
        this.dataSource.data = data;
      }
    })
  }
}
