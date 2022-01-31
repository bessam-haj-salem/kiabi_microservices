import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Client } from '../models/Client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  urlGetClients: string
  urlAddClient: string
  urlUpdateClient: string

  urlDeleteClient:string

  constructor(private http: HttpClient) { 
    this.urlGetClients = environment.urlGetClients
    this.urlAddClient = environment.urlAddClient
    this.urlDeleteClient = environment.urlDeleteClient
    this.urlUpdateClient = environment.urlUpdateClient



  }


  getClients() {
   return  this.http.get<Client[]>(this.urlGetClients)
  }

  addClient(data) {
    return this.http.post<Client>(this.urlAddClient, data)
  }
  editClient(data) {
    return this.http.put<Client>(this.urlUpdateClient + data.id, data)
  }

  deleteClient(id) {
    return this.http.delete(this.urlDeleteClient + id)
  }
}
