import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SubSink } from 'subsink';
import { Client } from '../../dashboard/models/Client.model';
import { ClientService } from '../../dashboard/services/client.service';
import { ProduitsService } from '../services/produits.service';

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.css']
})
export class AjoutProduitComponent implements OnInit, OnDestroy {
  @Output() addEvent = new EventEmitter<string>()
  addForm: FormGroup
  clients:Client[]
  private subs = new SubSink()

  constructor(private fb: FormBuilder, private produitService: ProduitsService, private clientService: ClientService) { }

  ngOnInit(): void {
    this.subs.sink = this.clientService.getClients().subscribe(res => {
      if(res.collection !== undefined) res = res.collection
      this.clients = res
    })
    this.addForm = this.fb.group({
      ref_product: null,
  
      nom_product: null,
    
      description: null,
    
      price: null,
  
      clientID: null


    })
  }
onSubmitAdd() {
  let formValue = this.addForm.value
  console.log(formValue);
  formValue["clientID"] = parseInt(formValue.clientID)
  this.subs.sink = this.produitService.addProduit(formValue).subscribe(res => {
    this.addForm.reset()
    this.addEvent.emit("reload")
    
    console.log(res);
  })

}
ngOnDestroy(): void {
    this.subs.unsubscribe()
}

}
