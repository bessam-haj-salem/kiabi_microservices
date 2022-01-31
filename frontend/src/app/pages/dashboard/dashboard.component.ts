import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Chart from 'chart.js';
import { SubSink } from 'subsink';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import { Client } from './models/Client.model';
import { ClientService } from './services/client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private subs = new SubSink()
   clients: Client[] = []
  private idClient:number
  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public boolAddForm:boolean = false
  public boolListForm:boolean= true
  public boolEditForm:boolean= false
  public boolTablesForm:boolean = true
  public clientSelected:Client
  editForm: FormGroup

  constructor(private clientService: ClientService, private fb: FormBuilder) {

  }

  ngOnInit() {
   this.listClient()
   this.editForm = this.fb.group({
    raison_social: null,
    num_sirette: null,
    adresse: null,
    email: null,
    telephone: null


  })
  }
 listClient() {
  this.subs.sink = this.clientService.getClients().subscribe((clients: Client[]) => {
    this.clients = clients

  })
 }
    // this.datasets = [
    //   [0, 20, 10, 30, 15, 40, 20, 60, 60],
    //   [0, 20, 5, 25, 10, 30, 15, 40, 40]
    // ];
    // this.data = this.datasets[0];


    // var chartOrders = document.getElementById('chart-orders');

    // parseOptions(Chart, chartOptions());


    // var ordersChart = new Chart(chartOrders, {
    //   type: 'bar',
    //   options: chartExample2.options,
    //   data: chartExample2.data
    // });

    // var chartSales = document.getElementById('chart-sales');

    // this.salesChart = new Chart(chartSales, {
		// 	type: 'line',
		// 	options: chartExample1.options,
		// 	data: chartExample1.data
		// });
  


  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }
  public openAddForm() {
    this.boolAddForm = true
    this.boolEditForm = false
    this.boolListForm = false
  }
  public closeAddForm() {
    this.boolAddForm = false
    this.boolEditForm = false
    this.boolTablesForm = true
    this.boolListForm = true
  }
  public updateList(event) {
    if(event) {
      this.listClient()

    }
  }
  public deleteClient(id) {
    console.log(id);
    this.subs.sink = this.clientService.deleteClient(id).subscribe(res => {
      console.log(res);
      this.listClient()
    })
  }
  public updateClient(id) {
    let idclient = id
    this.idClient = id
    let clients = this.clients
    for(let i = 0; i < clients.length; i++) {
      if(clients[i].id === idclient) {
        this.clientSelected = clients[i]
      }
    }
    console.log(this.clientSelected);
    this.boolTablesForm = true
    this.boolListForm = false
    this.boolEditForm = true


  }
  onSubmitEdit() {
    let formValue = this.editForm.value
    formValue["id"] = this.idClient
    console.log(formValue);
    this.subs.sink = this.clientService.editClient(formValue).subscribe(res => {
      this.editForm.reset()
      this.listClient()
      
      console.log(res);
    })
  
  }
}
