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
  selector: "app-commitee-type",
  templateUrl: "./commitee-type.component.html",
  styleUrls: ["./commitee-type.component.scss"],
})
export class CommiteeTypeComponent implements OnInit {
  commiteeForm: FormGroup;
  static_data: any;
  hideRequiredMarker: boolean = true;
  committeeId: any;
  editGrid: boolean;
  getAllCommitteeListApi: any;
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
    this.getAllOfficeList();
    this.dataOfficerList.data = [];
    this.initCommitteeOfficerForm();
    this.commonMethods.setCurrentLanguage();
    this.static_data = this.commonMethods.getCurrentLanguage();
  }
  addCommittee() {
    if (this.commiteeForm.valid) {
      const id = {
        committeTypeId: this.committeeId ? this.committeeId : 0,
        committeType: this.commiteeForm.value.type,
      };
      let findCommitteeName;
      findCommitteeName = this.getAllCommitteeListApi.find(
        (o: any) => o.committeType == this.commiteeForm.value.type
      );
      if (findCommitteeName) {
        this.commiteeForm.reset();
        this.editGrid = false;
        return this.snackbar.snackbarError(
          "This committee type has already been registered",
          this.masterDate.centre
        );
      } else {
        if (!this.editGrid) {
          this.service
            .postData(this.urlService.addCommitteeType, id)
            .subscribe((res: any) => {
              this.commiteeForm.reset();
              this.getAllOfficeList();
              this.snackbar.snackbarError(
                "Committee type added successfully",
                this.masterDate.centre
              );
            });
        } else {
          this.service
            .putData(this.urlService.updateCommitteeType, id)
            .subscribe((res: any) => {
              this.commiteeForm.reset();
              this.getAllOfficeList();
              this.editGrid = false;
              this.snackbar.snackbarError(
                "Committee type updated successfully",
                this.masterDate.centre
              );
            });
        }
      }
    }else{
      this.commiteeForm.markAllAsTouched();
     }
  }
  getAllOfficeList() {
    this.service
      .getData(this.urlService.getCommitteTypeList)
      .subscribe((res: any) => {
        this.getAllCommitteeListApi = res;
        this.dataOfficerList.data = [...this.getAllCommitteeListApi];
      });
  }
  initCommitteeOfficerForm(data: any = {}) {
    this.commiteeForm = new FormGroup({
      type: new FormControl(data.committeType, [Validators.minLength(2)]),
    });
  }
  dataOfficerList = new MatTableDataSource();
  displayedStudentsColumnsList: string[] = ["Committee", "action"];

  openConfirmationModal(id: any): void {
    if (this.dataOfficerList.data.length <= 1)
      return this.snackbar.snackbarError(
        "Minimum one committee type is required",
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
          .delete(this.urlService.deleteCommitteeType + "?CommitteId=" + result)
          .subscribe((res: any) => {
            this.getAllOfficeList();
            this.snackbar.snackbarError(
              "Committee type deleted successfully",
              this.masterDate.centre
            );
          });
      }
    });
  }
  editCommitteeForm(data: any) {
    document.querySelector(".mat-sidenav-content").scrollTop = 0;
    this.committeeId = data.committeTypeId;
    this.editGrid = true;
    this.initCommitteeOfficerForm(data);
  }
  back() {
    if (this.commiteeForm.dirty) {
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
