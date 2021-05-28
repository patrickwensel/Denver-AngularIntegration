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
  selector: "app-offices",
  templateUrl: "./offices.component.html",
  styleUrls: ["./offices.component.scss"],
})
export class OfficesComponent implements OnInit {
  office: FormGroup;
  static_data: any;
  editGrid: boolean;
  hideRequiredMarker: boolean = true;
  officeId: any;
  getAllOfficeListApi: any;
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
    this.dataOfficerList.data = [];
    this.getAllOfficeList();
    this.initCommitteeOfficerForm();
    this.commonMethods.setCurrentLanguage();
    this.static_data = this.commonMethods.getCurrentLanguage();
  }

  initCommitteeOfficerForm(data: any = {}) {
    this.office = new FormGroup({
      type: new FormControl(data.officeName, []),
    });
  }
  dataOfficerList = new MatTableDataSource();
  displayedStudentsColumnsList: string[] = ["Committee", "action"];
  addOffices() {
    if (this.office.valid) {
      const id = {
        officeId: this.officeId ? this.officeId : 0,
        officeName: this.office.value.type,
      };
      let findOfficeName;
      findOfficeName = this.getAllOfficeListApi.find(
        (o: any) => o.officeName == this.office.value.type
      );
      if (findOfficeName) {
        this.office.reset();
        this.editGrid = false;
        return this.snackbar.snackbarError(
          "This office has already been registered",
          this.masterDate.centre
        );
      } else {
        if (!this.editGrid) {
          this.service
            .postData(this.urlService.addOffice, id)
            .subscribe((res: any) => {
              this.office.reset();
              this.getAllOfficeList();
              this.snackbar.snackbarError(
                "Offices added successfully",
                this.masterDate.centre
              );
            });
        } else {
          this.service
            .putData(this.urlService.updateOffice, id)
            .subscribe((res: any) => {
              this.office.reset();
              this.getAllOfficeList();
              this.editGrid = false;
              this.snackbar.snackbarError(
                "Offices updated successfully",
                this.masterDate.centre
              );
            });
        }
      }
    }else{
      this.office.markAllAsTouched();
     }
  }
  getAllOfficeList() {
    this.service
      .getData(this.urlService.getallOfficeList)
      .subscribe((res: any) => {
        this.getAllOfficeListApi = res;
        this.dataOfficerList.data = [...this.getAllOfficeListApi];
      });
  }
  openConfirmationModal(id: any): void {
    if (this.dataOfficerList.data.length <= 1)
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
          .delete(this.urlService.deleteOffice + "?OfficeId=" + result)
          .subscribe((res: any) => {
            this.getAllOfficeList();
            this.snackbar.snackbarError(
              "Offices deleted successfully",
              this.masterDate.centre
            );
          });
      }
    });
  }
  editOfficerForm(data: any) {
    document.querySelector(".mat-sidenav-content").scrollTop = 0;
    this.officeId = data.officeId;
    this.editGrid = true;
    this.initCommitteeOfficerForm(data);
  }
  back() {
    if (this.office.dirty) {
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
