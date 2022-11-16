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
        return this.preloadOnDemand$.pipe(
            mergeMap(preloadOptions => {
                const shouldPreload = this.preloadCheck(route, preloadOptions)
                return shouldPreload ? load() : EMPTY
            })
        )

    }
    private preloadCheck(route: Route, preloadOptions: OnDemandPreloadOptions) {
        return (
            route?.data?.preload && [route.path].includes(preloadOptions.routePath) &&
            preloadOptions.preload
        )
    }
}