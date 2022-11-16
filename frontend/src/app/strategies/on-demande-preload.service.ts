import { Injectable } from '@angular/core';
import {Subject} from 'rxjs'

export class OnDemandPreloadOptions {
  constructor(public routePath: string, public preload =true) {}
}

@Injectable({
  providedIn: 'root'
})
export class OnDemandePreloadService  {
  private subject = new Subject<OnDemandPreloadOptions>()
  state$ = this.subject.asObservable()

  startPreload(routePath:string) {
    const message = new OnDemandPreloadOptions(routePath, true)
    console.log(message);
    this.subject.next(message)
  }


  constructor() { }
}
