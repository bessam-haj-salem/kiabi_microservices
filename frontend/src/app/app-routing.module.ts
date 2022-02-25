import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import {
  Routes,
  RouterModule,
  NoPreloading,
  PreloadAllModules,
} from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";

import { TestComponent } from "./test/test.component";
import { Test1Component } from "./test1/test1.component";
import { OptPreloadedStrategy } from "./strategies/opt-in-preload-strategy";
import { OnDemandPreloadStrategy } from "./strategies/on-demand-preload-strategy";
import { CustomPreloadingStrategyService } from "./strategies/custom-preloading-strategy.service";
import { AuthGuard } from "./core/guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "test",
    component: TestComponent,
  },
  {
    path: "test1",
    component: Test1Component,
  },

  {
    path: "admin",
    component: AdminLayoutComponent,
    children: [
      {
        path: "profile",
        loadChildren: () =>
          import("src/app/layouts/admin-layout/admin-layout.module").then(
            (m) => m.AdminLayoutModule
          ),
          data: { preload: true },
      },
    ],
  },
  {
    path: "user",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/user/user.module").then(
        (m) => m.UserModule
      ),
    data: { preload: true },

   
  },
  {
    path: "produit",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/pages/produits/produits.module").then(
        (m) => m.ProduitsModule
      ),
    data: { preload: true },

   
  },
  {
    path: "dashboard",
    canActivate: [AuthGuard],
    // component: DashboardComponent,
    // children: [

    loadChildren: () =>
      import("src/app/pages/dashboard/dashboard.module").then(
        (m) => m.DashboardModule
      ),
    data: { preload: true },

   
  },

  {
    path: "login",
    component: AuthLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/layouts/auth-layout/auth-layout.module").then(
            (m) => m.AuthLayoutModule
          ),
        // data: {preload: true}
      },
    ],
  },
  {
    path: "**",
    redirectTo: "login",
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,

    RouterModule.forRoot(routes, {
      preloadingStrategy: OnDemandPreloadStrategy,
      useHash: true,
    }),
  ],
  exports: [],
})
export class AppRoutingModule {}
