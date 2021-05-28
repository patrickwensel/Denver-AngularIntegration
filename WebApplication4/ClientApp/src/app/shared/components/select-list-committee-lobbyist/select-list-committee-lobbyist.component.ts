import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select-list-committee-lobbyist',
  templateUrl: './select-list-committee-lobbyist.component.html',
  styleUrls: ['./select-list-committee-lobbyist.component.scss']
})
export class SelectListCommitteeLobbyistComponent implements OnInit {
  @Input() showCommitee: any = false;
  @Input() CommLobbEntityList: any = [];
  @Output() deleteSelectedEmitter: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
    console.log(this.CommLobbEntityList)
  }

  removeCommLobby(data: any,idx:any) {
    this.deleteSelectedEmitter.emit({data , idx});
  }
}
