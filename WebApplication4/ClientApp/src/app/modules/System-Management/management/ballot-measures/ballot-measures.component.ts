import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  HostListener,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import {
  CommonMethods,
  ErrorMessageService,
  MasterDataService,
  MasterUrlService,
  SnackbarService,
} from "src/app/core";
import { DeleteModalComponent } from "src/app/shared/components/delete-modal/delete-modal.component";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import { ClientService } from "src/app/core/api-services/client.service";
import { Location } from "@angular/common";
import { ConfirmPopupComponent } from "src/app/shared/components/confirm-popup/confirm-popup.component";
@Component({
  selector: "app-ballot-measures",
  templateUrl: "./ballot-measures.component.html",
  styleUrls: ["./ballot-measures.component.scss"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
})
export class BallotMeasuresComponent implements OnInit {
  @ViewChild("scroll", { read: ElementRef }) public scroll: ElementRef<any>;
  ballotIssueForm: FormGroup;
  document: any;
  static_data: any;
  hideRequiredMarker: boolean = true;
  getElectionDate: any;
  getBallotIssueList: any;
  editGrid: boolean;
  ballotId: any;
  matchingBallot: any;
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
    this.dataBallotList.data = [];
    this.initCommitteeOfficerForm();
    this.getBallotIssue();
    this.getElection();
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
  save() {
    if (this.ballotIssueForm.valid) {
      const id = {
        ballotId: this.ballotId ? this.ballotId : 0,
        ballotIssueCode: this.ballotIssueForm.value.issueNumber,
        ballotIssue: this.ballotIssueForm.value.issueName,
        electioncycle: this.ballotIssueForm.value.electionCycle,
        description: this.ballotIssueForm.value.description,
      };
      let findIssueId;
      findIssueId = this.getBallotIssueList.find(
        (o: any) => o.ballotIssueCode == this.ballotIssueForm.value.issueNumber
      );
      let findIssueName;
      findIssueName = this.getBallotIssueList.find(
        (o: any) => o.ballotIssue == this.ballotIssueForm.value.issueName
      );
      if (findIssueId) {
        return this.snackbar.snackbarError(
          "This issue id already exists",
          this.masterDate.centre
        );
      } else if (findIssueName) {
        return this.snackbar.snackbarError(
          "This issue name already exists",
          this.masterDate.centre
        );
      } else {
        if (!this.editGrid) {
          this.service
            .postData(this.urlService.createBallot, id)
            .subscribe((res: any) => {
              this.ballotIssueForm.reset();
              this.getBallotIssue();
              this.snackbar.snackbarError(
                "Ballot issues added successfully",
                this.masterDate.centre
              );
            });
        } else {
          this.service
            .putData(this.urlService.updateBallotIssue, id)
            .subscribe((res: any) => {
              this.ballotIssueForm.reset();
              this.getBallotIssue();
              this.editGrid = false;
              this.snackbar.snackbarError(
                "Ballot issues updated successfully",
                this.masterDate.centre
              );
            });
        }
      }
    }else{
      this.ballotIssueForm.markAllAsTouched();
     }
  }
  getBallotIssue() {
    this.service.getData(this.urlService.getBallot).subscribe((res: any) => {
      this.getBallotIssueList = res;
      this.dataBallotList.data = [...this.getBallotIssueList];
    });
  }
  getMatchingBallot(result) {
    this.service.getData(this.urlService.getCommitteeListBallot + "?ballotIssueCode=" + result).subscribe((res: any) => {
      this.matchingBallot = res
    });
  }
  initCommitteeOfficerForm(data: any = {}) {
    this.ballotIssueForm = new FormGroup({
      issueNumber: new FormControl(data.ballotIssueCode, [
        Validators.minLength(1),
        Validators.maxLength(120),
      ]),
      issueName: new FormControl(data.ballotIssue || null, [
        Validators.minLength(1),
        Validators.maxLength(120),
      ]),
      description: new FormControl(data.description || null, []),
      electionCycle: new FormControl(data.electioncycle || null, [
        Validators.maxLength(120),
      ]),
    });

    // this.searchAdvanceSub = this.addCommitteeOfficerForm.get('SearchControl').valueChanges.pipe(debounceTime(500)).subscribe(val => {
    // this.searchAssociatedFacilities(val);
    // });
  }
  dataBallotList = new MatTableDataSource();
  displayedStudentsColumnsList: string[] = [
    "toggle",
    "ballotId",
    "ballotIssue",
    "electioncycle",
    "description",
    "edit",
  ];
  openConfirmationModal(id: any): void {
    if (this.dataBallotList.data.length <= 1)
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
          .delete(this.urlService.deleteBallotIssue + "?BallotId=" + result)
          .subscribe((res: any) => {
            this.getBallotIssue();
             this.snackbar.snackbarError(
              "Ballot issues deleted successfully",
              this.masterDate.centre
            );
          });
      }
    });
  }
  editOfficerForm(data: any) {
    document.querySelector(".mat-sidenav-content").scrollTop = 0;
    this.ballotId = data.ballotId;
    this.editGrid = true;
    this.initCommitteeOfficerForm(data);
  }
  back() {
    if (this.ballotIssueForm.dirty) {
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
    }else{
      this.location.back();
    }
  }
}
