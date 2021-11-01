import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appCursorPointer]'
})
export class CursorPointerDirective {

  constructor(private elementRef: ElementRef) { }

  @HostListener('mouseover') onMouseOver() {
    // this.elementRef.nativeElement.style.cssText = 'background-color: aqua; font-weight: bold; font-size: 24px'
  }

  @HostListener('mouseout') onMouseOut() {
    // this.elementRef.nativeElement.style = 'background-color: transparent; font-size: 16px; font-weight: normal'
  }

}
