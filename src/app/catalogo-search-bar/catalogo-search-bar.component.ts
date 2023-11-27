import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

export interface SearchEvent
{
  text: string;
  selectFilterIndex: number;
}
@Component({
  selector: 'app-catalogo-search-bar',
  templateUrl: './catalogo-search-bar.component.html',
  styleUrls: ['./catalogo-search-bar.component.sass']
})
export class CatalogoSearchBarComponent implements OnInit
{
  @Input() filters: Array<string> = [];
  @Input() placeholderText = '';
  @Input() expandLabel = '';
  @Input() closeLabel = '';
  @Input() searchbarSrText = '';
  @Input() filtersSrText = '';
  @Input() clearFieldSr = '';
  @Output() searchEvent = new EventEmitter<SearchEvent>();
  @Output() clearEvent = new EventEmitter();
  @Output() expandedChange = new EventEmitter<boolean>();
  expanded = false;
  currentFilter = 0;
  private expandedClass = 'searchbar-expanded';

  constructor() { }

  ngOnInit(): void
  {
  }

  onExpandClick(div: HTMLDivElement, input: HTMLInputElement): void
  {
    if (div.classList.contains(this.expandedClass))
    {
      div.classList.remove(this.expandedClass);
    }
    else
    {
      div.classList.add(this.expandedClass);
      input.focus();
    }

    this.expanded = !this.expanded;
    this.expandedChange.emit(this.expanded);
  }

  onFilterChange(index: number): void
  {
    this.currentFilter = index;
  }

  onSearch(text: string): void
  {
    this.searchEvent.emit({text, selectFilterIndex: this.currentFilter});
  }

  onClear(input: HTMLInputElement): void
  {
    this.clearEvent.emit();
    input.value = '';
    input.focus();
  }
}
