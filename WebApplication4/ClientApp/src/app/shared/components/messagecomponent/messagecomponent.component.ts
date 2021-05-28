import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-messagecomponent',
  templateUrl: './messagecomponent.component.html',
  styleUrls: ['./messagecomponent.component.scss']
})
export class MessagecomponentComponent implements OnInit {
  @Output() selectindex: EventEmitter<any> = new EventEmitter<any>();


  sampleobj = [
    {
      heading: 'Next Report due 12/10/20',
      subheading: 'System notification',
      date: 'Thursday 11/03/20, 4.45am'   
    },
    {
      heading: 'Documentation requested',
      subheading: 'System notification',
      date: 'Thursday 11/03/20, 4.45am'   
    },
    {
      heading: 'Add recent donations',
      subheading: 'System notification',
      date: 'Thursday 11/03/20, 4.45am'   
    },
    {
      heading: 'Next Report due 12/10/20',
      subheading: 'System notification',
      date: 'Thursday 11/03/20, 4.45am'   
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }


  msgclicked(item ) {
    console.log('methoad clidked');
    this.selectindex.emit(3);
  }
}
