import {Injectable} from '@angular/core';
import {PreloadingStrategy, Route} from '@angular/router';
import {Observable, of, Subject, timer,EMPTY, mergeMap} from 'rxjs';
import {map} from 'rxjs/operators'


export class OnDemandPreloadOptions {
  constructor(public routePath: string, public preload =true) {}
}
@Injectable({
  providedIn: 'root'
})

export class CustomPreloadingStrategyService implements PreloadingStrategy {
  routePath = new Subject()
  
  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    const loadRoute = (delay) => delay > 0 ? timer(delay*1000).pipe(map(() => fn())) : fn();
    if (route.data && route.data.preload) {
      const delay = route.data.loadAfterSeconds ? route.data.loadAfterSeconds : 0;
      return loadRoute(delay);
    }
    return of(null);
  }
 
}