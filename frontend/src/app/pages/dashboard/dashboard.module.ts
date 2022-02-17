import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ClipboardModule } from "ngx-clipboard";

// import { DashboardComponent } from "./dashboard.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AjoutClientComponent } from "src/app/pages/dashboard/ajout-client/ajout-client.component";
import { DashboardRoutes } from "./dashboard.routing";
import { ListeClientsComponent } from './liste-clients/liste-clients.component';
import { ComponentsModule } from "src/app/components/components.module";
import { DashboardComponent } from "./dashboard.component";
import { ClientAllComponent } from "./client-all/client-all.component";
// import { ComponentsModule } from "src/app/components/components.module";
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ComponentsModule,
    ClipboardModule,
  ],
  declarations: [ AjoutClientComponent, ListeClientsComponent,DashboardComponent, ClientAllComponent],
})
export class DashboardModule {}
