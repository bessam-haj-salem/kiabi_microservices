import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProduitsRoutes } from "./produits.routing";
import { ComponentsModule } from "src/app/components/components.module";
import { ProduitsComponent } from './produits.component';
import { AjoutProduitComponent } from './ajout-produit/ajout-produit.component';
import { ProduitAllComponent } from './produit-all/produit-all.component';
import { ListeProduitComponent } from './liste-produit/liste-produit.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ProduitsRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
  ],
  declarations: [  
  
    ProduitsComponent, AjoutProduitComponent, ProduitAllComponent, ListeProduitComponent
  ],
})
export class ProduitsModule {}
