import { Injectable } from '@angular/core';
import httpClient from '../infrastructure/http.client';

@Injectable()
export class WeatherRepository {

  async random() {
    // const resp = await fetch("http://api.openweathermap.org/geo/1.0/reverse?lat=51.5098&lon=-0.1180&limit=5&appid=a8c9d3733c5e4c09699942fb318cd288");
    const resp = await fetch("http://api.openweathermap.org/data/2.5/weather?lat=36.720077&lon=9.187480&appid=a8c9d3733c5e4c09699942fb318cd288");

    const data = await resp.json();
    
    return data;
  }
}