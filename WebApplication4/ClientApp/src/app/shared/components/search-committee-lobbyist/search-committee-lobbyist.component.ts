import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommonMethods, ErrorMessageService } from "src/app/core";
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search-committee-lobbyist',
  templateUrl: './search-committee-lobbyist.component.html',
  styleUrls: ['./search-committee-lobbyist.component.scss']
})
export class SearchCommitteeLobbyistComponent implements OnInit {
  @Input() showCommitee: any = false;
  @Input() showJoinIndipendent: any = false;
  @Input() isFromSwitchComm: any = false;
  @Input() options: any;
  @Input() lobbyOption: any;
  @Input() selectedItems: any;
  @Output() addSelectedEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() addSearchEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() navigatePath: EventEmitter<any> = new EventEmitter<any>();

  searchpopular: any;
  txtQueryChanged: Subject<string> = new Subject<string>();
  data = this.commonMethods.getCurrentLanguage();
  constructor(public commonMethods: CommonMethods) {
    //Search Debounce
    this.txtQueryChanged.pipe(
      debounceTime(1000),// wait 1 sec after the last event before emitting last event
      distinctUntilChanged())// only emit if value is different from previous value
      .subscribe(model => {
        this.searchpopular = model;
        this.addSearchEmitter.emit(this.searchpopular);

      });
  }

  ngOnInit(): void {
    console.log(this.showCommitee);
    console.log(this.lobbyOption);
    console.log(this.selectedItems);
  }

  selectedItem(data: any) {
    this.addSelectedEmitter.emit(data);
  }
  routeTopath(data: any) {
    this.navigatePath.emit(data);
  }
}
