import { Component, OnInit } from '@angular/core';
import { CommonMethods, MasterUrlService } from 'src/app/core';
import { Location } from "@angular/common";
import { ClientService } from 'src/app/core/api-services/client.service';

@Component({
  selector: 'app-modify-forms',
  templateUrl: './modify-forms.component.html',
  styleUrls: ['./modify-forms.component.scss']
})
export class ModifyFormsComponent implements OnInit {
  static_data: any;
  constructor(
    private commonMethods: CommonMethods,
    private location: Location,
    private service: ClientService,
    private urlService: MasterUrlService,
  ) { }
  modifyLabels = [ {
    displayName: 'City Seal',
  },
  {
    displayName: 'City Clerk Seal',
  },
  {
    displayName: 'Header',
  },
  {
    displayName: 'Footer',
  },
  {
    displayName: 'Clerk Signature',
  }
]
  ngOnInit(): void {
    this.commonMethods.setCurrentLanguage();
    this.static_data = this.commonMethods.getCurrentLanguage();
  }
  back(){
    this.location.back();
  }
  imageIndex(e){
   const id = {
    appId: 0,
    appName: "string",
    themeName: "string",
    logoUrl: "string",
    favIcon: "string",
    bannerImageUrl: "string",
    sealImageUrl: e[0]?e[0]:"string",
    clerkSealImageUrl: e[1]?e[1]:"string",
    headerImageUrl: e[2]?e[2]:"string",
    footerImageUrl: e[3]?e[3]:"string",
    clerkSignImageUrl: e[4]?e[4]:"string"
    }
    this.service
          .postData(this.urlService.createModifyForm, id)
          .subscribe((res: any) => {
          });
  }
}
