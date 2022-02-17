import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Client } from '../models/Client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  // urlGetClients: string
  // urlAddClient: string
  urlClients: string
  // urlUpdateClient: string

  // urlDeleteClient:string

  constructor(private http: HttpClient) { 
    // this.urlGetClients = environment.urlGetClients
    // this.urlAddClient = environment.urlAddClient
    this.urlClients = environment.urlClients

    // this.urlDeleteClient = environment.urlDeleteClient
    // this.urlUpdateClient = environment.urlUpdateClient



  }


  getClients() {
   return  this.http.get<any>(this.urlClients + 123)
  }

  addClient(data) {
    return this.http.post<Client>(this.urlClients + 123, data)
  }
  editClient(data) {
    return this.http.put<Client>(this.urlClients + data.id, data)
  }

  deleteClient(id) {
    return this.http.delete<any>(this.urlClients + id)
  }
}
