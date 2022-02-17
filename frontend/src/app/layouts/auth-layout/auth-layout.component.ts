import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CustomPreloadingStrategyService } from 'src/app/strategies/custom-preloading-strategy.service';
import { OnDemandePreloadService } from 'src/app/strategies/on-demande-preload.service';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit, OnDestroy {
  test: Date = new Date();
  public isCollapsed = true;

  constructor(private router: Router, private preloadOnDemandService: OnDemandePreloadService, private customPreloadingStrategy: CustomPreloadingStrategyService) { }

  ngOnInit() {
    var html = document.getElementsByTagName("html")[0];
    html.classList.add("auth-layout");
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("bg-default");
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });

  }
  ngOnDestroy() {
    var html = document.getElementsByTagName("html")[0];
    html.classList.remove("auth-layout");
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("bg-default");
  }
  preloadBundle(routePath) {
    console.log("mouseover");
    console.log(routePath);
    this.preloadOnDemandService.startPreload(routePath)

  }
}
