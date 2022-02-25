import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Produit } from '../models/Produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {
  urlProduits: string

  constructor(private http: HttpClient) { 
    this.urlProduits = environment.urlProduits

  }


  getProduits() {
   return  this.http.get<any>(this.urlProduits + 123)
  }

  addProduit(data) {
    return this.http.post<Produit>(this.urlProduits + 123, data)
  }
  editProduit(data) {
    return this.http.put<Produit>(this.urlProduits + data.id, data)
  }

  deleteProduit(id) {
    return this.http.delete<any>(this.urlProduits + id)
  }
}
