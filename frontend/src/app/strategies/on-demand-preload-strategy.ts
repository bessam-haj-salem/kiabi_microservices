import { Injectable } from "@angular/core";
import { PreloadingStrategy, Route } from "@angular/router";
import { EMPTY, mergeMap, Observable } from "rxjs";
import { OnDemandePreloadService, OnDemandPreloadOptions } from "./on-demande-preload.service";

@Injectable({providedIn:'root', deps: [OnDemandePreloadService]})
export class OnDemandPreloadStrategy implements PreloadingStrategy {
    private preloadOnDemand$: Observable<OnDemandPreloadOptions>

    constructor(private preloadOnDemandService: OnDemandePreloadService) {
        this.preloadOnDemand$ = this.preloadOnDemandService.state$
    }

    preload(route:Route, load: () => Observable<any>): Observable<any> {
        // console.log(route);
        return this.preloadOnDemand$.pipe(
            mergeMap(preloadOptions => {
                // console.log(route);
                const shouldPreload = this.preloadCheck(route, preloadOptions)
                // console.log(shouldPreload);
                if(shouldPreload) {
                    // console.log(`Preloading: Checking if we need preload ${route.path}`);
                }
                return shouldPreload ? load() : EMPTY
            })
        )

    }
    private preloadCheck(route: Route, preloadOptions: OnDemandPreloadOptions) {
        // console.log([route.path]);
        // console.log(route?.data?.preload);
        // console.log(preloadOptions.routePath);
        // console.log([route.path].includes(preloadOptions.routePath));
        return (
            route?.data?.preload && [route.path].includes(preloadOptions.routePath) &&
            preloadOptions.preload
        )
    }
}