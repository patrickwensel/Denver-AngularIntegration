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
  selector: "app-matching-limit",
  templateUrl: "./matching-limit.component.html",
  styleUrls: ["./matching-limit.component.scss"],
})
export class MatchingLimitComponent implements OnInit {
  publicfunding: FormGroup;
  static_data: any;
  hideRequiredMarker: boolean = true;
  matchingId: any;
  getElectionDate: any;
  editGrid: boolean;
  getAllMatchingListApi: any;
  constructor(
    private commonMethods: CommonMethods,
    public errorService: ErrorMessageService,
    public snackbar: SnackbarService,
    public dialog: MatDialog,
    public masterDate: MasterDataService,
    private service: ClientService,
    private urlService: MasterUrlService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.dataMatchingList.data = [];
    this.initCommitteeOfficerForm();
    this.getElection();
    this.getAllMatchingList();
    this.commonMethods.setCurrentLanguage();
    this.static_data = this.commonMethods.getCurrentLanguage();
  }
  getElection() {
    this.service
      .getData(this.urlService.getElectionList)
      .subscribe((res: any) => {
        this.getElectionDate = res;
      });
  }
  initCommitteeOfficerForm(data: any = {}) {
    this.publicfunding = new FormGroup({
      election_cycle: new FormControl(data.electionCycle, []),
      start_date: new FormControl(data.startDate, []),
      end_date: new FormControl(data.enddate, []),
      qualifying_offices: new FormControl(data.qualifyingOffices, []),
      available: new FormControl(data.totalAvailableFunds, []),
      ratio: new FormControl(data.matchingRatio, []),
      qualifying_contribution: new FormControl(
        data.qualifyingContributionAmount,
        []
      ),
      number_of_req: new FormControl(
        data.numberRequiredQualifyingContributions,
        []
      ),
      contr_limit: new FormControl(data.contributionLimitsforParticipate, []),
      contr_amount: new FormControl(data.matchingContributionAmount, []),
    });
  }
  addmatchingLimits() {
    if (this.publicfunding.valid) {
      const id = {
        qualifyingContributionAmount: parseInt(
          this.publicfunding.value.qualifying_contribution
        ),
        matchingId: this.matchingId ? this.matchingId : 0,
        matchingContributionAmount: parseInt(
          this.publicfunding.value.contr_amount
        ),
        numberRequiredQualifyingContributions: parseInt(
          this.publicfunding.value.number_of_req
        ),
        matchingRatio: parseInt(this.publicfunding.value.ratio),
        contributionLimitsforParticipate: parseInt(
          this.publicfunding.value.contr_limit
        ),
        totalAvailableFunds: parseInt(this.publicfunding.value.available),
        qualifyingOffices: this.publicfunding.value.qualifying_offices,
        startDate: this.publicfunding.value.start_date,
        enddate: this.publicfunding.value.end_date,
        electionCycle: this.publicfunding.value.election_cycle,
      };
      if (!this.editGrid) {
        this.service
          .postData(this.urlService.addMatchingLimits, id)
          .subscribe((res: any) => {
            this.publicfunding.reset();
            this.getAllMatchingList();
            this.snackbar.snackbarError(
              "Public funding added successfully",
              this.masterDate.centre
            );
          });
      } else {
        this.service
          .putData(this.urlService.updateMatchingLimits, id)
          .subscribe((res: any) => {
            this.publicfunding.reset();
            this.getAllMatchingList();
            this.editGrid = false;
            this.snackbar.snackbarError(
              "Public funding updated successfully",
              this.masterDate.centre
            );
          });
      }
    }else{
     this.publicfunding.markAllAsTouched();
    }
  }
  getAllMatchingList() {
    this.service
      .getData(this.urlService.getMatchingLimitsList)
      .subscribe((res: any) => {
        this.getAllMatchingListApi = res;
        this.dataMatchingList.data = [...this.getAllMatchingListApi];
      });
  }
  dataMatchingList = new MatTableDataSource();
  displayedStudentsColumnsList: string[] = [
    "qca",
    "No_of_required",
    "participants",
    "contribution_amount",
    "match_ratio",
    "qualifying_period",
    "qualifying_offices",
    "election",
    "action",
  ];

  openConfirmationModal(id: any): void {
    if (this.dataMatchingList.data.length <= 1)
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
          .delete(this.urlService.deleteMatchingLimits + "?Id=" + result)
          .subscribe((res: any) => {
            this.getAllMatchingList();
            this.snackbar.snackbarError(
              "Public funding deleted successfully",
              this.masterDate.centre
            );
          });
      }
    });
  }
  editOfficerForm(data: any) {
    document.querySelector(".mat-sidenav-content").scrollTop = 0;
    this.matchingId = data.matchingId;
    this.editGrid = true;
    this.initCommitteeOfficerForm(data);
  }
  back() {
    if (this.publicfunding.dirty) {
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
