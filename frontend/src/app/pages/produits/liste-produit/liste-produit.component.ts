import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { SubSink } from "subsink";
import { Produit } from "../models/Produit";
import { ProduitsService } from "../services/produits.service";

// core components

@Component({
  selector: "app-liste-produit",
  templateUrl: "./liste-produit.component.html",
  styleUrls: ["./liste-produit.component.css"],
})
export class ListeProduitComponent implements OnInit {
  private subs = new SubSink();
  produits: Produit[] = [];
  private idProduit: number;
  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public boolAddForm: boolean = false;
  public boolListForm: boolean = true;
  public boolEditForm: boolean = false;
  public boolTablesForm: boolean = true;
  public produitselected: Produit;
  editForm: FormGroup;

  constructor(
    private produitservice: ProduitsService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.listProduit();
    this.editForm = this.fb.group({
      ref_product: null,

      nom_product: null,

      description: null,

      price: null,
      clientID: null
    });
    // console.log(isDevMode());
  }
  listProduit() {
    this.subs.sink = this.produitservice
      .getProduits()
      .subscribe((produits: any) => {
        console.log(produits);
        if (produits.collection != undefined) {
          this.produits = produits.collection;
        } else {
          this.produits = produits;
        }
      });
  }
  

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }
  public openAddForm() {
    this.boolAddForm = true;
    this.boolEditForm = false;
    this.boolListForm = false;
  }
  public closeAddForm() {
    this.boolAddForm = false;
    this.boolEditForm = false;
    this.boolTablesForm = true;
    this.boolListForm = true;
  }
  public updateList(event) {
    if (event) {
      this.listProduit();
    }
  }
  public deleteProduit(id) {
    console.log(id);
    this.subs.sink = this.produitservice.deleteProduit(id).subscribe((res) => {
      console.log(res);
      this.listProduit();
    });
  }
  public updateProduit(id) {
    let idProduit = id;
    this.idProduit = id;
    let produits = this.produits;
    for (let i = 0; i < produits.length; i++) {
      if (produits[i].id === idProduit) {
        this.produitselected = produits[i];
      }
    }
    console.log(this.produitselected);
    this.boolTablesForm = true;
    this.boolListForm = false;
    this.boolEditForm = true;
  }
  onSubmitEdit() {
    let formValue = this.editForm.value;
    formValue["id"] = this.idProduit;
    console.log(formValue);
    this.subs.sink = this.produitservice
      .editProduit(formValue)
      .subscribe((res) => {
        this.editForm.reset();
        this.listProduit();

        console.log(res);
      });
  }
}
