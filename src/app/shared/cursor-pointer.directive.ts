import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appCursorPointer]'
})
export class CursorPointerDirective {

  constructor(private elementRef: ElementRef) { }

  @HostListener('mouseover') onMouseOver() {
    this.elementRef.nativeElement.style = 'background-color: aqua'
  }

  @HostListener('mouseout') onMouseOut() {
    this.elementRef.nativeElement.style = 'background-color: transparent'
  }

}
