import { Injectable } from '@angular/core';
import { SnackbarService } from '../core/snackbar/snackbar.service';
import { MasterUrlService } from './api-urls';
import { ClientService } from '../core/api-services/client.service';

@Injectable()
export class LabelsAndOptions {
  constructor(
    private masertUrl: MasterUrlService,
    private snackbar: SnackbarService,
    private service: ClientService,
  ) { }

}
