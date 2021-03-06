import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservablesService {

  constructor() { }

  private tabTitle: string = '';
  private tabTitle$ = new Subject<string>(); 
  private showBackButton$ = new BehaviorSubject(false);

  private backButtonEvent$ = new Subject<boolean>();

  getShowBackButton$(): BehaviorSubject<boolean>{
    return this.showBackButton$;
  }

  setShowBackButton(show: boolean):void{
    this.showBackButton$.next(show);
  }

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
