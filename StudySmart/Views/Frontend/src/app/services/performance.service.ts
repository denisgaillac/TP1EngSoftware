import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {

  baseRoute: string = environment.baseRoute;
  controller: string = "Performance/";

  constructor(private httpClient: HttpClient) { }

  getProgress() {
    return [
      { "day": "20-01", "idealValue": 62, "realValue": 62 },
      { "day": "21-01", "idealValue": 56, "realValue": 59 },
      { "day": "22-01", "idealValue": 48, "realValue": 50, },
      { "day": "23-01", "idealValue": 48, "realValue": 45 },
      { "day": "24-01", "idealValue": 38, "realValue": 39, },
      { "day": "25-01", "idealValue": 33, "realValue": 33 },
      { "day": "26-01", "idealValue": 22, "realValue": 28 },
      { "day": "27-01", "idealValue": 22, "realValue": 22, },
      { "day": "28-01", "idealValue": 14, "realValue": 19 },
      { "day": "29-01", "idealValue": 7, "realValue": 8, },
      { "day": "30-01", "idealValue": 0, "realValue": 3 } 
    ]
  }


  _getProgress(filter: any) {
    return new Promise((resolve, reject) => {
      this.httpClient.post(this.baseRoute + this.controller, filter)
      .subscribe(data => {
          resolve(data);
      }, err => {
          reject(err);
      });
    });
  }
  
}

