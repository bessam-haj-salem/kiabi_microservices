import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ApiService } from "src/app/core/services/api.service";
import { SubSink } from "subsink";

// core components

import { Client } from "../models/Client.model";
import { ClientService } from "../services/client.service";
import { ThemePalette } from "@angular/material/core";
import {
  BehaviorSubject,
  combineLatest,
  combineLatestWith,
  map,
  merge,
  Observable,
  of,
  scan,
  shareReplay,
  Subject,
  tap,
} from "rxjs";
@Component({
  selector: "app-liste-clients",
  templateUrl: "./liste-clients.component.html",
  styleUrls: ["./liste-clients.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListeClientsComponent implements OnInit {
  private subs = new SubSink();
  public color: ThemePalette = "primary";
  clients: Client[] = [];
  // public loading: boolean = false;
  private idClient: number;
  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public boolAddForm: boolean = false;
  public boolListForm: boolean = true;
  public boolEditForm: boolean = false;
  public boolTablesForm: boolean = true;
  public clients$: Observable<Client[]> = of([]);
  public clientInserted$;
  public filteredClients$: Observable<Client[]> = of([]);
  private _clientFilter = "";
  public filterSubject: Subject<string> = new BehaviorSubject<string>("");
  public clientSelected$: Observable<Client>;
  editForm: FormGroup;
  // clientSelected = {
  //   id: 1 ,
  //   raison_social : "jkhjkh" ,
  //   num_sirette: "jkhjkh" ,
  //   adresse: "jkhjkh" ,
  //   email:"jkhjkh"  ,
  //   telephone: "jkhjkh"

  // }
  constructor(
    private clientService: ClientService,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    // this.clientService.getClients().subscribe(data => {
    //   console.log(data)
    // })

    // this.clientService.getClientsWithAdd().subscribe(data => {
    //   console.log(data)
    // })
    this.listClient();
    this.editForm = this.fb.group({
      raison_social: null,
      num_sirette: null,
      adresse: null,
      email: null,
      telephone: null,
    });

    // console.log(isDevMode());
  }

  ngOnChanges(): void {}
  ngAfterViewInit(): void {}
  public get clientFilter(): string {
    return this._clientFilter;
  }
  public set clientFilter(filter: string) {
    this._clientFilter = filter;
  }
  public filterChange(value: string) {
    console.log("value ", value);
    this.filterSubject.next(value);
  }

  listClient() {
    this.clients$ = this.clientService.getClients().pipe(
      map((clients) => {
        // console.log(clients)
        if (clients.collection != undefined) {
          return clients.collection;
        } else {
          return clients;
        }
      })
    );
    let clientAdd$ = merge(
      this.clients$,
      this.clientService.clientInserted$
    ).pipe(
      tap((data) => console.log(data)),
      scan((acc: Client[], value: any) => {
        console.log(acc);
        console.log(value);
        const index =acc.findIndex((client) => client.id === value.id)
        if(index !== -1) {
          acc[index] = value
          return acc
        }
        return [...acc, value];
      }),
      shareReplay(1)
    );
    console.log(clientAdd$);
    // this.clients$ = this.clientService.clientsWithAdd$
    this.filteredClients$ = this.createFilterClients(
      this.filterSubject,
      clientAdd$
    );
    // .pipe(tap((res) => console.log(res)));
    this.clientSelected$ = this.clientService.getSelected$;
 
  }

  public createFilterClients(
    filter$: Observable<string>,
    clients$: Observable<Client[]>
  ): Observable<Client[]> {
    return clients$.pipe(
      combineLatestWith(filter$),
      map(([clients, filter]) => {
        // console.log(filter);
        // console.log(clients);
        if (filter === "") return clients;
        return clients.filter(
          (client: Client) =>
            client.raison_social
              .toLocaleLowerCase()
              .indexOf(filter.toLocaleLowerCase()) !== -1
        );
      })
    );
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
    // console.log(event)
    // this.loading = true
    if (event) {
      // this.loading = false;
      setTimeout(() => {
        this.listClient();
      }, 500);
    }
  }
  public deleteClient(id) {
    // console.log(id);
    // this.loading = true;
    this.subs.sink = this.clientService.deleteClient(id).subscribe((res) => {
      console.log(res);
      // this.loading = false;

      setTimeout(() => {
        this.listClient();
      }, 500);
    });
  }

  public updateClient(client: Client) {
    // let idclient = id;
    this.idClient = client.id;
    console.log(this.idClient);
    // let clients = this.clients;
    // for (let i = 0; i < clients.length; i++) {
    //   if (clients[i].id === idclient) {
    //     this.clientSelected = clients[i];
    //   }
    // }
    this.clientService.getSelectedClient(client);
    this.boolTablesForm = true;
    this.boolListForm = false;
    this.boolEditForm = true;
  }
  onSubmitEdit() {
    let formValue = this.editForm.value;
    formValue["id"] = this.idClient;
    console.log(formValue);
    this.subs.sink = this.clientService
      .editClient(formValue)
      .subscribe((res) => {
        this.clientService.insertClient(formValue)
        this.editForm.reset();
        // setTimeout(() => {
        //   this.listClient();
        // }, 500);

        // console.log(res);
      });
  }
}
