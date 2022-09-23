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
  Observable,
  of,
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
  public filteredClients$: Observable<Client[]> = of([]);
  public clientSelected: Client;
  private _clientFilter = "";
  public filterSubject: Subject<string> = new BehaviorSubject<string>('');
  editForm: FormGroup;

  constructor(
    private clientService: ClientService,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit() {
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

  //   ngOnChanges(): void {
  //     this.listClient();
  //   }
  // ngAfterViewInit(): void {
  //   this.ngOnChanges()
  // }
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
        if (clients.collection != undefined) {
          return clients.collection;
        } else {
          return clients;
        }
      })
    );
    this.filteredClients$ = this.createFilterClients(
      this.filterSubject,
      this.clients$
    ).pipe(
      tap(res => console.log(res))
    );
    // this.clientFilter =''
    // this.subs.sink = this.clientService
    //   .getClients()
    //   .subscribe((clients: any) => {
    //     this.loading = false
    //   console.log(clients)
    //     if (clients.collection != undefined) {

    //       this.clients = clients.collection;
    //     } else {
    //       this.clients = clients;
    //     }
    // });
  }

  public createFilterClients(
    filter$: Observable<string>,
    clients$: Observable<Client[]>
  ): Observable<Client[]> {
    return clients$.pipe(
      combineLatestWith(filter$),
      map(([clients, filter]) => {
        console.log(filter)
        console.log(clients)
        if (filter === "")  return clients
          return clients.filter(
            (client: Client) =>
              client.raison_social.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1
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

  public updateClient(id) {
    let idclient = id;
    this.idClient = id;
    let clients = this.clients;
    for (let i = 0; i < clients.length; i++) {
      if (clients[i].id === idclient) {
        this.clientSelected = clients[i];
      }
    }
    console.log(this.clientSelected);
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
        this.editForm.reset();
        setTimeout(() => {
          this.listClient();
        }, 500);

        // console.log(res);
      });
  }
}
