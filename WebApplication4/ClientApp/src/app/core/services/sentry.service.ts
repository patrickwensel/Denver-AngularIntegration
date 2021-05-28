import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http'
import * as Sentry from "@sentry/browser";
import { Integrations } from "@sentry/tracing";



Sentry.init({
    dsn: "https://8bef078c09c74c80a0581c3b56e757b8@o233697.ingest.sentry.io/5469478",
    integrations: [
      new Integrations.BrowserTracing({
       // tracingOrigins: ["localhost", "https://yourserver.io/api"],
        // routingInstrumentation: Sentry.routingInstrumentation,
      }),
    ],
  
    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });
//   enableProdMode();
//   platformBrowserDynamic()
//     .bootstrapModule(AppModule)
//     .then(success => console.log(`Bootstrap success`))
//     .catch(err => console.error(err));
@Injectable({
  providedIn: 'root'
})
export class SentryErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) { }
  handleError(error: any) {
    const router = this.injector.get(Router);
    //capture error to sentry cloud
    const eventId = Sentry.captureException(error.originalError || error);
    if (Error instanceof HttpErrorResponse) {
    console.log(error.status);
    }
    else {
    console.error("an error occured here mate");
    //ask user to report error if error not server related
  //  Sentry.showReportDialog({ eventId });
    }
    //navigate to error page
    //router.navigate(['error']);
    
    //return error;
    //pass the error if needed
  }
}
