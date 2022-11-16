import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, merge, Observable, scan, shareReplay, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../models/Client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  // urlGetClients: string
  // urlAddClient: string
  urlClients: string
  urlAddRabbit: string
  private clientInsertedSubject = new Subject<Client>()
  public clientInserted$ = this.clientInsertedSubject.asObservable();

  private selectedSubject: Subject<Client> = new BehaviorSubject<Client>(null)
  public getSelected$ : Observable<Client>= this.selectedSubject.asObservable()
  // urlUpdateClient: string

  // urlDeleteClient:string

  constructor(private http: HttpClient) { 
    // this.urlGetClients = environment.urlGetClients
    // this.urlAddClient = environment.urlAddClient
    this.urlClients = environment.urlClients
    this.urlAddRabbit = environment.urlAddRabbit

    // this.urlDeleteClient = environment.urlDeleteClient
    // this.urlUpdateClient = environment.urlUpdateClient



  }
  insertClient(client: Client) {
    console.log(client)
  this.clientInsertedSubject.next(client)
  }

  public getSelectedClient(client: Client) {
    this.selectedSubject.next(client)

  }
  public clients$ = this.getClients().pipe(
    map((clients) => {
      if (clients.collection != undefined) {
        return clients.collection;
      } else {
        return clients;
      }
    })
  );

  getClientsWithAdd() {
    return merge(
      this.clients$,
      this.clientInserted$
    ).pipe(
      scan((acc: Client[], value:any) => {
        console.log(acc)
        console.log(value)
        const index =acc.findIndex((client) => client.id === value.id)
        if(index !== -1) {
          acc[index] = value
          return acc
        }
        return [...acc,value]
      }),
      shareReplay(1)
    )
  }
public clientsWithAdd$ = merge(
  this.clients$,
  this.clientInserted$
).pipe(
  scan((acc: Client[], value:any) => {
    console.log(acc)
    console.log(value)
    const index =acc.findIndex((client) => client.id === value.id)
    console.log(index)
    if(index !== -1) {
      acc[index] = value
      return acc
    }
    return [...acc,value]
  }),
  shareReplay(1)
)
  getClients() {
   return  this.http.get<any>(this.urlClients + 123).pipe(
    tap(res => console.log(res))
   )
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
  addRabbit(data) {
    return this.http.post<Client>(this.urlAddRabbit, data)
  }
}
