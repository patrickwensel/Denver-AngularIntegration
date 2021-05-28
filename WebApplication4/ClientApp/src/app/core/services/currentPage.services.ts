import { BehaviorSubject } from 'rxjs';
import { MasterDataService } from '../index';
// import { FacilityService, PatientToPhysician } from './Shared-services';
import { Injectable } from '@angular/core';

@Injectable()
export class CurrentPage {
    
    private navMenu: BehaviorSubject<any> = new BehaviorSubject<any>({
        currentMenu: '',
        previousMenu: '',
        title: ''
    });
    
    data = this.navMenu.asObservable();
    public currentMenu: any;
    
    constructor(        
        private masterKey: MasterDataService,
    ){
    }

    public setNavMenuValue(menuOpt: any) {
        this.navMenu.next(menuOpt);
    }

    public getNavMenuValue() {
        return this.navMenu.value;
    }
}