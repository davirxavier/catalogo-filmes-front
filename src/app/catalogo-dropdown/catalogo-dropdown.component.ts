import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export interface DropdownHeader
{
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-catalogo-dropdown',
  templateUrl: './catalogo-dropdown.component.html',
  styleUrls: ['./catalogo-dropdown.component.sass'],
})
export class CatalogoDropdownComponent implements OnInit {

  @Input() content: Array<string>;
  @Output() clickEvent = new EventEmitter<number>();
  @Input() buttonText: string;
  @Input() buttonIconName: string;
  @Input() rightAligned: boolean;
  @Input() header: DropdownHeader = null;
  @Input() openInHover = false;
  @Input() actAsSelect = false;
  @Input() selectedIndex = 0;
  @Input() buttonAriaLabel = '';
  @Output() selectedIndexChange = new EventEmitter<number>();
  display: string;

  constructor()
  {
  }

  ngOnInit(): void
  {
    this.close(undefined);
  }

  show(): void
  {
    this.display = 'block';
  }

  close(index: number): void
  {
    this.display = 'none';

    if (index !== undefined)
    {
      this.clickEvent.emit(index);
      if (index !== this.selectedIndex)
      {
        this.selectedIndexChange.emit(index);
        this.selectedIndex = index;
      }
    }
  }

  onMouseEnter(): void
  {
    if (this.openInHover)
    {
      this.show();
    }
  }

  onMouseLeave(): void
  {
    if (this.openInHover)
    {
      this.close(undefined);
    }
  }
}
