import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appOutsideClick]',
})
export class OutsideClickDirective
{
  @Output() outsideClickEvent = new EventEmitter<void>();

  constructor(private element: ElementRef)
  {
  }

  @HostListener('document:click', ['$event.target'])
  public click(target): void
  {
    const inside = this.element.nativeElement.contains(target);
    if (!inside)
    {
      this.outsideClickEvent.emit();
    }
  }
}
