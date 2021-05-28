import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-msgscreen-right-panel',
  templateUrl: './msgscreen-right-panel.component.html',
  styleUrls: ['./msgscreen-right-panel.component.scss']
})
export class MsgscreenRightPanelComponent implements OnInit {
  @Input() msghead : any;
  @Input() msgcontent : any;
  @Input() msgdate:  any;


  constructor() { }

  ngOnInit(): void {
  }

}
