import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CommonMethods } from "src/app/core";

@Component({
  selector: "app-modify",
  templateUrl: "./modify.component.html",
  styleUrls: ["./modify.component.scss"],
})
export class ModifyComponent implements OnInit {
  @Input() modifyLabels: any;
  @Output() imageIndex: EventEmitter<any> = new EventEmitter<any>();
  modifyItems: any[];
  imageArray = [];
  static_data: any;
  imageBase64: string | ArrayBuffer;
  constructor(
    private commonMethods: CommonMethods,

  ) {}

  ngOnInit(): void {
    this.getModifyItems();
    this.commonMethods.setCurrentLanguage();
    this.static_data = this.commonMethods.getCurrentLanguage();
  }
  getModifyItems() {
    let labelarray: any;
    this.modifyItems = [];
    this.modifyItems = this.modifyLabels;
  }
  selectImage(e, index) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageBase64 = reader.result;
      this.imageArray[index] = this.imageBase64;
    };
  }
  save(){
    this.imageIndex.emit(this.imageArray);
  }
}
