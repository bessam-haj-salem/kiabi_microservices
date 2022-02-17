import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ClipboardModule } from "ngx-clipboard";

// import { DashboardComponent } from "./dashboard.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Test1Component } from "./test1/test1.component";
import { TestComponent } from "./test/test.component";

// import { ComponentsModule } from "src/app/components/components.module";
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    // ComponentsModule,
  ],
  declarations: [ Test1Component, TestComponent],
})
export class TestModule {}
