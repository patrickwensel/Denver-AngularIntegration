import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CommonMethods, MasterUrlService } from 'src/app/core';
import { ClientService } from 'src/app/core/api-services/client.service';
import { Location } from "@angular/common";
@Component({
  selector: 'app-user-permission',
  templateUrl: './user-permission.component.html',
  styleUrls: ['./user-permission.component.scss']
})
export class UserPermissionComponent implements OnInit {
  
  commitLobbyList: ['option 1', 'option 2','option 3'];
  static_data: any;
  getUserPermissionList: any = [];
  constructor(
    private commonMethods: CommonMethods,
    private service: ClientService,
    private urlService: MasterUrlService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.static_data = this.commonMethods.getCurrentLanguage();
    this.permissionGet();
  }
  permissionGet(){
     this.service
           .getData(this.urlService.permissionList)
           .subscribe((res: any) => {
             this.getUserPermissionList = res
             this.dataUserPermissionList.data = [...this.getUserPermissionList];
           });
   }
  dataUserPermissionList = new MatTableDataSource();
  displayedStudentsColumnsList: string[] = ['ComponentName', 'Candidate', 'Treasurer', 'CommitteeOfficer', 
  'PrimaryLobbyst', 'Lobbyist', 'Official'];
  
  back(){
    this.location.back();
  }
}
