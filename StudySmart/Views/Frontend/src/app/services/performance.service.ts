import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {

  constructor() { }


  getData() {
    return [
      { "day": "25-01-21", "idealValue": 33, "realValue": 33 },
      { "day": "26-01-21", "idealValue": 22, "realValue": 28 },
      { "day": "25-01-21", "idealValue": 22, "realValue": 22, },
      { "day": "26-01-21", "idealValue": 14, "realValue": 19 },
      { "day": "25-01-21", "idealValue": 7, "realValue": 8, },
      { "day": "26-01-21", "idealValue": 0, "realValue": 3 } 
    ]
  }
  
}
