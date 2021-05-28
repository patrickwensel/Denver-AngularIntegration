import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { CommonMethods } from 'src/app/core';

@Component({
  selector: 'app-confirmation-screen',
  templateUrl: './confirmation-screen.component.html',
  styleUrls: ['./confirmation-screen.component.scss']
})
export class ConfirmationScreenComponent implements OnInit {
  @Input() type: any ;
  @Input() user:any;
  data = this.commonMethods.getCurrentLanguage();
  emailStorage: any;
  email: any;
  constructor(public commonMethods: CommonMethods,
    public router: Router,
    ) {
    this.emailStorage =localStorage.getItem('email');
    this.email = (this.emailStorage)?.replace(/"/g, " ");
     }

  ngOnInit(): void {
    console.log(this.type)
  }
  login(){
    this.router.navigate(['/login'])
  }
}
