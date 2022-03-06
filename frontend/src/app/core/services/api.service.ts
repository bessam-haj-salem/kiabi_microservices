import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  urlApiWeather: string
  urlApiCrackend: string



  constructor(private http: HttpClient) {
    // this.urlApiWeather = environment.urlApiWeather
    this.urlApiCrackend = environment.urlApiCrackend

   }


   getWeather() {
     return this.http.get<any>(this.urlApiCrackend)
}

}
