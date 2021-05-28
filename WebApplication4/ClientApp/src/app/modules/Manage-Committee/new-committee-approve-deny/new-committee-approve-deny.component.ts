import { Component, Input, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonMethods, ErrorMessageService, MasterUrlService, SnackbarService } from 'src/app/core';
import { ClientService } from 'src/app/core/api-services/client.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-committee-approve-deny',
  templateUrl: './new-committee-approve-deny.component.html',
  styleUrls: ['./new-committee-approve-deny.component.scss']
})
export class NewCommitteeApproveDenyComponent implements OnInit, OnDestroy {

  static_data: any;
  addNoteForm:FormGroup;
  msgForm:FormGroup;
  committeeDetails:any;
  hideRequiredMarker: boolean = true;
  committeeId:any = 47;
  updateStatus:any;
  addNoteValue:any;
  //addNote:any;
  sub: Subscription;
  id: any;
  type='string';
  comType = '';
  candidateLabels: any;
  bindItems: any;

  constructor( public errorService: ErrorMessageService,
    private commonMethods: CommonMethods,
    private urlService: MasterUrlService,
    private service: ClientService,
    public snackbar: SnackbarService,
    private activeroute: ActivatedRoute,
    private changeDetectorRefs: ChangeDetectorRef
    ) { }


  ngOnInit(): void {
    this.commonMethods.setCurrentLanguage();
    this.static_data = this.commonMethods.getCurrentLanguage();
    this. createManageCommittee();
    this.MessageSendForm();
    this.sub = this.activeroute.paramMap.subscribe(params => {
      console.log(params);
      this.id = params.get('id');
    });
  }

  getCommitteeType(e) {
    console.log(e);
    this.comType = e;
    console.log('add', this.candidateLabels);
  }

  createManageCommittee() {
    this.addNoteForm = new FormGroup({
      addNote: new FormControl('' || null,[Validators.required]),
    });
  }

  MessageSendForm(){
    this.msgForm = new FormGroup({
      subject: new FormControl('' || null,[Validators.required]),
      message: new FormControl('' || null, [Validators.required])
    })
  }

  validateApprove(status){
    if(this.addNoteForm.valid){
      this.addNoteValue = this.addNoteForm.value;
      this.service.postData(this.urlService.updateCommitteeStatus +this.committeeId + '&status=' +status +'&notes='+this.addNoteValue.addNote,{}).subscribe((res:any) => {
        this.updateStatus = res;
        this.snackbar.snackbarSuccess("Committee Details Approved Successfully");
      })
    }
    else{
      this.addNoteForm.markAllAsTouched;
    }
  }

  validateDeny(status){
    if(this.addNoteForm.valid){
      this.addNoteValue = this.addNoteForm.value;
      this.service.postData(this.urlService.updateCommitteeStatus +this.committeeId + '&status=' +status +'&notes='+this.addNoteValue.addNote,{}).subscribe((res:any) => {
        this.updateStatus = res;
        this.snackbar.snackbarSuccess("Committee Details Denied");
      })
    }
    else{
      this.addNoteForm.markAllAsTouched;
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
