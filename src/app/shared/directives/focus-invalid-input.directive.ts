import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appFocusInvalidInput]'
})
export class FocusInvalidInputDirective {

  constructor(private el: ElementRef) { }

  @HostListener('submit', ['$event'])
  onSubmit() {
    console.log(this.el);
    const invalidControl = this.el.nativeElement.querySelector('.ng-invalid');

    if (invalidControl) {
      invalidControl.focus();
    }
  }
}
