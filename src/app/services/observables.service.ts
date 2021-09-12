import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservablesService {

  constructor() { }

  private tabTitle: string = '';
  private tabTitle$ = new Subject<string>(); 

  getTabTitle(): string{
    return this.tabTitle
  }

  tabTitleObservable(): Observable<string>{
    return this.tabTitle$.asObservable()
  }

  setTabTitle(title: string){
    this.tabTitle = title
    this.tabTitle$.next(title)
  }


  
}
