import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[keyPrevent]'
})
export class KeyPreventDirective {

  constructor(private el: ElementRef) { }

  @Input() OnlyNumber: boolean;
  @Input() OnlyNumberDot: boolean;
  @Input() Alphabets: boolean;
  @Input() Alphanumeric: boolean;
  @Input() Alphanumericspace: boolean;
  @Input() AlphaSpace: boolean;
  @Input() NameField: boolean;
  @Input() DateField: boolean;
  @Input() SplitRange: boolean;
  @Input() Alphanumericspacehyphen: boolean;
  @Input() mailAddress: boolean;
  @HostListener('keydown', ['$event']) onKeyDown(event:any) {
    const e = event as KeyboardEvent;
    // REMOVED 110 becz that points to . on larger keyboard so individually can decide if it has to go.
    if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+C
      (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+V
      (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+X
      (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)) {
      // let it happen, don't do anything
      return;
    }
    if (this.OnlyNumber) {
      // Ensure that it is a number and stop the keypress
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
      }
    }  if (this.mailAddress) {
      // Ensure that it is a number and stop the keypress
      if ((e.shiftKey && e.keyCode == 191)) {
        e.preventDefault();
      }
    }
     else if (this.OnlyNumberDot) {
      // Ensure that it is a number and stop the keypress
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        if (e.keyCode !== 190 && e.keyCode !== 110) {
          e.preventDefault();
        }
      }
    } else if (this.Alphabets) {
      // Ensure that it is a alphabets and stop the keypress
      if (e.keyCode < 65 || e.keyCode > 90) {
        e.preventDefault();
      }
    } else if (this.Alphanumeric) {
      // Ensure that it is a number and stop the keypress
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105) &&
        (e.keyCode < 65 || e.keyCode > 90)) {
        e.preventDefault();
      }
    } else if (this.AlphaSpace) {
      // Ensure that it is a alphabets and stop the keypress
      if (e.keyCode < 65 || e.keyCode > 90) {
        if (e.keyCode !== 32) {
          e.preventDefault();
        }
      }
    } else if (this.NameField) {
      // Ensure that it is a alphabets and stop the keypress
      if (e.keyCode < 65 || e.keyCode > 90) {
        if (e.keyCode !== 32 && e.keyCode !== 109 && e.keyCode !== 189) {
          e.preventDefault();
        }
      }
    } else if (this.Alphanumericspace) {
      // Ensure that it is a alphabets and stop the keypress
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105) &&
        (e.keyCode < 65 || e.keyCode > 90)) {
        if (e.keyCode !== 32) {
          e.preventDefault();
        }
      }
    } else if (this.DateField) {
      // Use only picker
      // e.preventDefault();
      // Ensure that it is a number or slash and stop the keypress
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105) && (e.keyCode !== 191)) {
        e.preventDefault();
      }
    } else if (this.SplitRange) {
      // Ensure that it is a number or slash and stop the keypress
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105) && (e.keyCode !== 188) && (e.keyCode !== 189) && (e.keyCode !== 109)  && (e.keyCode !== 173) ) {
        e.preventDefault();
      }
    } else if (this.Alphanumericspacehyphen) {
      if ((e.shiftKey || (e.keyCode === 45 || e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105) &&
        (e.keyCode < 65 || e.keyCode > 90)) {
        if (e.keyCode !== 32 && e.keyCode !== 189 && e.keyCode !== 173) {
          e.preventDefault();
        }
      }
    }
  }
}