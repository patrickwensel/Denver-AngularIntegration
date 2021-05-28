import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import {
  CommonMethods,
  ErrorMessageService,
  MasterDataService,
  MasterUrlService,
  SnackbarService,
} from "src/app/core";
import { DeleteModalComponent } from "src/app/shared/components/delete-modal/delete-modal.component";
import { ClientService } from "src/app/core/api-services/client.service";
import { Location } from "@angular/common";
import { ConfirmPopupComponent } from "src/app/shared/components/confirm-popup/confirm-popup.component";

@Component({
  selector: "app-contribution-limits",
  templateUrl: "./contribution-limits.component.html",
  styleUrls: ["./contribution-limits.component.scss"],
})
export class ContributionLimitsComponent implements OnInit {
  contribution: FormGroup;
  static_data: any;
  hideRequiredMarker: boolean = true;
  FormEditId: any = 0;
  editGrid: boolean;
  getContributionData: any;
  ContributionId: any;
  getFilerTypeData: any;
  getDonorTypeData: any;
  getOfficeTypeData: any;
  getElectionDate: any;
  constructor(
    private commonMethods: CommonMethods,
    public errorService: ErrorMessageService,
    public snackbar: SnackbarService,
    public dialog: MatDialog,
    private service: ClientService,
    public masterDate: MasterDataService,
    private urlService: MasterUrlService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.dataContributionList.data = [];
    this.initCommitteeOfficerForm();
    this.commonMethods.setCurrentLanguage();
    this.static_data = this.commonMethods.getCurrentLanguage();
    this.getFilerTypeList();
    this.getOfficeTypeList();
    this.getDonorTypeList();
    this.getElection();
    this.getContributionList();
  }

  initCommitteeOfficerForm(data: any = {}) {
    this.contribution = new FormGroup({
      filer_type: new FormControl(data.filerTypeId, []),
      office: new FormControl(data.officeTypeId, []),
      donar_type: new FormControl(data.donorTypeId, []),
      contribution_limit: new FormControl(data.contLimit, []),
      elect_cycle: new FormControl(data.electionCycleId, []),
    });
  }
  save() {
    if (this.contribution.valid) {
      const id = {
        id: this.ContributionId ? this.ContributionId : 0,
        filerTypeId: this.contribution.value.filer_type,
        filerType: this.getFilerTypeData.find((element) => {
          return element.filerTypeId == this.contribution.value.filer_type;
        }).filerType,
        officeTypeId: this.contribution.value.office,
        officeType: this.getOfficeTypeData.find((element) => {
          return element.officeTypeId == this.contribution.value.office;
        }).officeType,
        donorTypeId: this.contribution.value.donar_type,
        donorType: this.getDonorTypeData.find((element) => {
          return element.donorTypeId == this.contribution.value.donar_type;
        }).donorType,
        contLimit: parseInt(this.contribution.value.contribution_limit),
        electionCycleId: parseInt(this.contribution.value.elect_cycle),
        electionYear: this.getElectionDate.find((element) => {
          return element.id == this.contribution.value.elect_cycle;
        }).name,
        tenantId: 1,
        desc: "string",
      };
      if (!this.editGrid) {
        this.service
          .postData(this.urlService.createContribution, id)
          .subscribe((res: any) => {
            this.contribution.reset();
            this.getContributionList();
            this.snackbar.snackbarError(
              "Contribution limits added successfully",
              this.masterDate.centre
            );
          });
      } else {
        this.service
          .putData(this.urlService.updateContribution, id)
          .subscribe((res: any) => {
            this.contribution.reset();
            this.getContributionList();
            this.editGrid = false;
            this.snackbar.snackbarError(
              "Contribution limits updated successfully",
              this.masterDate.centre
            );
          });
      }
    }else{
      this.contribution.markAllAsTouched();
     }
  }
  getFilerTypeList() {
    this.service
      .getData(this.urlService.getFilerTypeList)
      .subscribe((res: any) => {
        this.getFilerTypeData = res;
      });
  }
  getElection() {
    this.service
      .getData(this.urlService.getElectionList)
      .subscribe((res: any) => {
        this.getElectionDate = res;
      });
  }
  getDonorTypeList() {
    this.service
      .getData(this.urlService.getDonorTypeList)
      .subscribe((res: any) => {
        this.getDonorTypeData = res;
      });
  }
  getOfficeTypeList() {
    this.service
      .getData(this.urlService.getOfficeTypeList)
      .subscribe((res: any) => {
        this.getOfficeTypeData = res;
      });
  }
  getContributionList() {
    this.service
      .getData(this.urlService.getContribution)
      .subscribe((res: any) => {
        this.getContributionData = res;
        this.dataContributionList.data = [...this.getContributionData];
      });
  }
  dataContributionList = new MatTableDataSource();
  displayedStudentsColumnsList: string[] = [
    "filerType",
    "officeTypeId",
    "electionYear",
    "donorTypeId",
    "limit",
    "action",
  ];

  openConfirmationModal(id: any): void {
    if (this.dataContributionList.data.length <= 1)
      return this.snackbar.snackbarError(
        "Minimum one officer is required",
        this.masterDate.centre
      );
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: "460px",
      // height: "350px",
      data: {
        id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result !== "close") {
        this.service
          .delete(this.urlService.deleteContribution + "?id=" + result)
          .subscribe((res: any) => {
            this.getContributionList();
            this.snackbar.snackbarError(
              "Contribution limits deleted successfully",
              this.masterDate.centre
            );
          });
      }
    });
  }
  editOfficerForm(data: any) {
    document.querySelector(".mat-sidenav-content").scrollTop = 0;
    this.editGrid = true;
    this.ContributionId = data.id;
    this.initCommitteeOfficerForm(data);
  }
  back() {
    if (this.contribution.dirty) {
      const options = {
        title: "Alert",
        message: "Are you sure you want to proceed without saving the changes?",
        cancelText: "Cancel",
        confirmText: "YES",
      };
      const dialogRef = this.dialog.open(ConfirmPopupComponent, {
        panelClass: ["ourmodal", "small-modal"],
        disableClose: true,
        data: {
          title: options.title,
          message: options.message,
          cancelText: options.cancelText,
          confirmText: options.confirmText,
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.location.back();
        }
      });
    } else {
      this.location.back();
    }
  }
}
