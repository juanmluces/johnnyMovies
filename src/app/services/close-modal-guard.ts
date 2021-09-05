import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';


export interface CanComponentDeactivate {
  canDeactivate: () => Promise<boolean> | boolean;
}



@Injectable({
  providedIn: 'root'
})
export class CloseModalGuard implements CanDeactivate<CanComponentDeactivate> {

  public canDeactivate(component: CanComponentDeactivate): Promise<boolean> | boolean {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
