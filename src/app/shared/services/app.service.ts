import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  isHeaderHidden = new BehaviorSubject<boolean>(true);
  constructor() { }

  setisHeaderHidden(isHeaderHidden: boolean): void {
    console.log(isHeaderHidden)
    this.isHeaderHidden.next(isHeaderHidden);
  }

  getisHeaderHidden(): BehaviorSubject<boolean> {
    return this.isHeaderHidden;
  }
}
