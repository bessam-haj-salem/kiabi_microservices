import { Injectable } from "@angular/core";
import { PreloadingStrategy, Route } from "@angular/router";
import { EMPTY, Observable } from "rxjs";




@Injectable({providedIn: 'root'})
export class OptPreloadedStrategy implements PreloadingStrategy {

    preload(route:Route,load: () => Observable<any> ): Observable<any> {
        console.log(route?.data?.preload)
        return route?.data?.preload ? load() : EMPTY
    }
}