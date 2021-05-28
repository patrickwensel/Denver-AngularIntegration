import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonMethods, ErrorMessageService} from "src/app/core";

@Component({
  selector: 'app-select-create-commitee-lobby',
  templateUrl: './select-create-commitee-lobby.component.html',
  styleUrls: ['./select-create-commitee-lobby.component.scss']
})
export class SelectCreateCommiteeLobbyComponent implements OnInit {
  @Input() showCommitee: any = false;
  @Output() selectedEmitter: EventEmitter<any> = new EventEmitter<any>();
  data = this.commonMethods.getCurrentLanguage();
  constructor(
    private commonMethods: CommonMethods,
  ) { }

  ngOnInit(): void {
    // this.commonMethods.setCurrentLanguage();
    // this.static_data = this.commonMethods.getCurrentLanguage();
  }

  showSelect(showSel: any) {
    this.selectedEmitter.emit(showSel);
  }
}
