import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {environment} from '../environments/environment';

export interface SearchMessage
{
  searchText: string;
  attrKey: string;
}
@Injectable({
  providedIn: 'root'
})
export class FilmeSearchService
{
  private searchObs = new Subject<SearchMessage>();
  private clearObs = new Subject();
  private waitTime = environment.searchWaitTimeMs;

  constructor() { }

  public search(text: string, attrKey: string): void
  {
    this.searchObs.next({searchText: text, attrKey});
  }

  public onSearch(): Observable<SearchMessage>
  {
    return this.searchObs.pipe(debounceTime(this.waitTime),
      map(value =>
      {
        if (value && value.searchText)
        {
          value.searchText = value.searchText.trim();
        }
        return value;
      }),
      distinctUntilChanged());
  }

  public clear(): void
  {
    this.clearObs.next();
  }

  public onClearSearch(): Observable<any>
  {
    return this.clearObs;
  }
}
