import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {stringComparatorUppercase, stringComparatorUppercaseReversed} from '../util/string';

export interface TableColumn
{
  name: string;
  propertyKey: string;
}

@Component({
  selector: 'app-catalogo-table',
  templateUrl: './catalogo-table.component.html',
  styleUrls: ['./catalogo-table.component.sass']
})
export class CatalogoTableComponent implements OnInit
{
  @Input() columns: Array<TableColumn> = [];
  @Input() rows: Array<any> = [];
  @Input() caption: string;
  @Input() hasIndexColumn = true;
  @Input() indexColumnName = 'No.';
  @Input() toggleColumn: TableColumn = null;
  @Input() editColumn: TableColumn = null;
  @Input() pageSize = 7;
  @Input() totalItems = 0;
  @Input() disableDefaultSorting = false;
  @Input() tableName = 'tabela';
  @Input() currentPage = 1;
  /**
   * Retorna o index na página atual de itens, não o índice total.
   */
  @Output() editOnClick = new EventEmitter<number>();
  /**
   * Retorna o index na página atual de itens, não o índice total.
   */
  @Output() toggleOnClick = new EventEmitter<number>();
  @Output() currentPageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() sortColumn = new EventEmitter<string>();

  currentSortedProperty: string;
  doubleCurrentSort = false;

  @Input() isRowEditable: (row) => boolean = () => true;
  @Input() isColumnSortable: (col) => boolean = () => true;

  constructor()
  {
    // TODO Calcular tamanho da página
    this.pageSizeChange.emit(this.pageSize);
  }

  ngOnInit(): void
  {
  }

  onSort(property: string): void
  {
    let comparator = stringComparatorUppercase;

    if (property === this.currentSortedProperty && !this.doubleCurrentSort)
    {
      comparator = stringComparatorUppercaseReversed;
      this.doubleCurrentSort = true;
    }
    else
    {
      this.doubleCurrentSort = false;
    }

    this.currentSortedProperty = property;
    this.sortColumn.emit(property + ((this.doubleCurrentSort) ? ',desc' : ',asc'));
    if (this.disableDefaultSorting)
    {
      return;
    }
    this.rows = this.rows.sort((r1, r2) =>
    {
      return comparator(r1[property], r2[property]);
    });
  }

  getRow(index: number): any
  {
    return this.rows[index];
  }

  getRowProperties(): Array<string>
  {
    if (this.rows.length > 0)
    {
      return this.columns.map(col =>
      {
        return col.propertyKey;
      });
    }

    return [];
  }

  onToggleClicked(event, row: object, index: number): void
  {
    // const row = this.rows[index];
    row[this.toggleColumn.propertyKey] = event.checked;
    this.toggleOnClick.emit(index);
  }

  onEditClicked(index: number): void
  {
    this.editOnClick.emit(index);
  }

  onPageChangeEvent(event): void
  {
    this.currentPage = event;
    this.currentPageChange.emit(this.currentPage);
  }
}
